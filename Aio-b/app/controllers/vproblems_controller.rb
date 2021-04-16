require('spiders/codeforces_spider.rb')

class VproblemsController < ApplicationController
  before_action :set_problem, only: [:show, :update, :destroy]

  # GET /vproblems
  def index
    @problems = Problem.where(source: params[:source]).first(10)
    if @problems.nil?
      spider = Spider.new
      problems = spider.spide_problems
      problems.each do |problem|
        Problem.create(problem)
      end
      @problems = Problem.where(source: params[:source]).first(10)
    end
    render json: @problems
  end

  # GET /vproblems/search?source=source&vid=vid&name=name
  def search
    source = params[:source]
    vid = params[:vid]
    name = params[:name]

    if vid.nil? and name.nil?
      @problems = Problem.where(source: source) 
    elsif vid.nil?
      @problems = Problem.where(source: source, name: name) 
    elsif name.nil?
      @problems = Problem.where(source: source, vid: vid) 
    else
      @problems = Problem.where(source: source, vid: vid, name: name) 
    end
    @problems = Problem.where(source: source, name: name) 
    render json: @problems
  end

  # GET /vproblems/1
  def show
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
    if @problem.update(problem_params)
      render json: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end

  # DELETE /vproblems/1
  def destroy
    @problem.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_problem
      @problem = Problem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def problem_params
      params.permit(Problem.column_names - ['created_at', 'updated_at'],
                    allowed_languages:[], tags:[], samples:[:sampleInput, :sampleOutput])
    end
end
