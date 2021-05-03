class VproblemsController < ApplicationController
  before_action :set_problem, only: [:show, :update, :destroy, :respide, :submit]
  before_action :set_page, only: [:search]

  # GET /vproblems
  # Need to be fixed.
  def index
    @problems = Problem.where(source: params[:source]).first(10)
    if @problems.nil?
      spider = get_spider(params[:source])
      problems = spider.spide_problems
      problems.each do |problem|
        Problem.create(problem)
      end
      @problems = Problem.where(source: params[:source]).first(10)
    end
    render json: @problems
  end

  # GET /vproblems/search
  # Need to be fixed when source is nil.
  def search
    source = params[:source]
    query = params[:query]
    if query.nil? 
      total = Problem.where(source: source).count
      @problems = Problem.where(source: source).order(:id).limit(20).offset(@page * 20)
      if @problems.empty?
        puts "FUCK YOU SPIDE AGAIN, BUG APPEARS"
        spider = get_spider(source)
        problems = spider.spide_problems
        problems.each do |problem|
          Problem.create(problem)
        end
        total = Problem.where(source: source).count
        @problems = Problem.where(source: source).order(:id).limit(20).offset(@page * 20)
      end
    else
      total = Problem.where('source=? and name ilike (?)', source.downcase, "%#{query}%").count
      @problems = Problem.where('source=? and name ilike (?)', 
                                source.downcase, "%#{query}%")
                         .order(:id).limit(20).offset(@page * 20)
    end
    render json: { total: total, problems: @problems }
  end

  # GET /vproblems/1
  def show
    if @problem.description.nil?
      spider = get_spider(@problem.source)
      problem = spider.spide_problem(@problem.vid) 
      allowed_languages = Language.find_by(source: @problem.source).allowed_languages
      problem[:allowed_languages] = allowed_languages
      @problem.update(problem)
    end
    render json: @problem
  end

  # POST /vproblems
  def create
    @problem = Problem.find_by(token: params[:token])

    if @problem.update(problem_params)
      render json: @problem.token, status: :ok, location: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /vproblems/1
  def update
=begin
    if @problem.update(problem_params)
      render json: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
=end
  end

  # POST /vproblems/submit/1
  def submit
    source = @problem.source
    vid = @problem.vid
    code = params[:code].dump
    language = params[:language]
    contest_id = params[:contest_id] || 0
    user_id = params[:user_id]
    user_name = params[:user_name]
    submission_record = SubmissionRecord.create(
      problem_id: @problem.id,
      contest_id: contest_id,
      user_id: user_id,
      user_name: user_name,
      result: "judging"
    )

    ActionCable.server.broadcast cpu_submission_stream, submission_record
    ActionCable.server.broadcast cp_submission_stream, submission_record
    ActionCable.server.broadcast cu_submission_stream, submission_record
    ActionCable.server.broadcast c_submission_stream, submission_record

    Thread.new do
      spider = get_spider(source)
      submission = spider.submit(vid, language, code)
      submission_record.update(submission)
      ActionCable.server.broadcast cpu_submission_stream, submission_record
      ActionCable.server.broadcast cp_submission_stream, submission_record
      ActionCable.server.broadcast cu_submission_stream, submission_record
      ActionCable.server.broadcast c_submission_stream, submission_record
    end
    render json: submission_record
  end
  
  # GET /vproblems/respide/1
  def respide
    spider = get_spider(@problem.source)
    problem = spider.spide_problem(@problem.vid)
    @problem.update(problem)
    render json: @problem
  end

  # GET /vproblems/respides
  # Need to be fixeds
  def respides
    n = Problem.where(source: params[:source]).count
    spider = get_spider(params[:source])
    problems = spider.spide_problems(n)
    problems.each do |problem| 
      Problem.create(problem)
    end
    @problems = Problem.where(source: params[:source]).limit(10).order(:id).reverse_order
    render json: @problems
  end

  # DELETE /vproblems/1
  def destroy
    @problem.destroy
  end

  private
    
    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    def set_problem
      @problem = Problem.find(params[:id])
    end

    def get_spider(source)
      which = source.capitalize
      "#{which}::#{which}Spider".constantize.new
    end

    # contest_problem_user
    def cpu_submission_stream
      "submission_#{params[:contest_id] || 0}_#{params[:id]}_#{params[:user_id]}"
    end

    def cp_submission_stream
      "submission_#{params[:contest_id] || 0}_#{params[:id]}_0}"
    end

    def cu_submission_stream
      "submission_0_#{params[:contest_id] || 0}_#{params[:user_id]}"
    end

    def c_submission_stream
      "submission_#{params[:contest_id] || 0}_0_0"
    end

    # Only allow a trusted parameter "white list" through.
    def problem_params
      params.permit(Problem.column_names - ['created_at', 'updated_at'], 
                    allowed_languages:[], tags:[], samples:[:sampleInput, :sampleOutput])
    end
end
