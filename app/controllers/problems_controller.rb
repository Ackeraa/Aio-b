require 'securerandom'

class ProblemsController < ApplicationController
  before_action :set_problem, only: [:show, :update, :destroy, :delete_template,
                                     :delete_spj, :delete_data, :submit, :upload_template,
                                     :upload_spj, :upload_data]
  before_action :authenticate_user!, only: [:submit]

  # GET /problems
  def index
    #@user = current_user
    #UserMailer.with(user: @user).welcome_email.deliver
    @problems = Problem.first(10)

    render json: @problems
  end

  # GET /problems/search?source=source&query=query
  def search
    #Need to be fixed if source is empty.
    source = params[:source]
    query = params[:query]
    if query.nil? 
      @problems = Problem.where(source: source) 
    else
      @problems = Problem.where('source=? and lower(name) like (?)',
                                source.downcase, "%#{query.downcase}%") 
    end

    render json: @problems
  end

  # GET /problems/1
  def show
    render json: @problem
  end

  # POST /problems
  def create
    @problem = Problem.new(problem_params)

    render json: 1, status: :ok, location: @problem
    '''
    if @problem.save
      render json: @problem.id, status: :ok, location: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
    '''
  end

  # PATCH/PUT /problems/1
  def update
    if @problem.update(problem_params)
      render json: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end

  # DELETE /problems/1
  def destroy
    @problem.destroy
  end

  # POST /problems/1/submit
  def submit
    user = current_user
    code = params[:code].dump
    language = params[:language]
    contest_id = params[:contest_id] || 0
    submission = Submission.create(
      problem_id: @problem.id,
      contest_id: contest_id,
      user_id: user.id,
      result: "judging"
    )
    p "FUCL", code
    render json: submission
  end

  # POST /problems/upload_template
  def upload_template
    upload(:template)
  end

  # POST /problems/delete_template
  def delete_template
    @problem.remove_template!
    @problem.save
    render json: @problem, status: :ok
  end

  # POST /problems/upload_spj
  def upload_spj
    upload(:spj)
  end

  # POST /problems/delete_spj
  def delete_spj
    @problem.remove_spj!
    @problem.save
    render json: @problem, status: :ok
  end

  # POST /problems/upload_data
  def upload_data
    upload(:data)
  end

  # POST /problems/delete_data
  def delete_data
    @problem.remove_data!
    @problem.save
    render json: @problem, status: :ok
  end

  private

    def upload(type)
      @problem.update(type.to_sym => params[type]) 
      if @problem.save
        unzip(@problem.data.file.file)
        render json: @problem.token, status: :ok
      else
        render json: @problem.errors, status: :unprocessable_entity
      end
    end


    def unzip(path)
      dir = path.rpartition('/').first
      system "cd #{dir}; rm -rf in out; mkdir in out &&\
              unzip -ojq *.zip *.in *.out && mv *.in in && mv *.out out"
    end


    def set_problem
      @problem = Problem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def problem_params
      params.permit(Problem.column_names - ['created_at', 'updated_at'],
                    allowed_languages:[], tags:[], samples:[:sample_input, :sample_output])
    end
end
