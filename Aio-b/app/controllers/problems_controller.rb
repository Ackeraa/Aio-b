require 'securerandom'

class ProblemsController < ApplicationController
  before_action :set_problem, only: [:show, :update, :destroy]

  # GET /problems
  def index
    @problems = Problem.all

    render json: @problems
  end

  # GET /problems/1
  def show
    render json: @problem
  end

  # POST /problems
  def create
    @problem = Problem.new(problem_params)

    if @problem.save
      render json: @problem, status: :created, location: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
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

  def upload(type)
    if params[:token].empty? 
      params[:token] = SecureRandom.uuid
      @problem = Problem.new(problem_params)
    else
      @problem = Problem.find_by(token: params[:token]) 
      @problem.update(type.to_sym => params[type]) 
    end

    if @problem.save
      render json: @problem.token, status: :ok
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end

  def upload_template
    self.upload(:template)
  end

  def upload_spj
    self.upload(:spj)
  end

  def upload_data
    self.upload(:data)
  end

  def delete_template
    @problem = Problem.find_by(token: params[:token]) 
    @problem.remove_template!
    @problem.save
    render json: @problem, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_problem
      @problem = Problem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def problem_params
      puts Problem.column_names
      params.permit(Problem.column_names - ['created_at', 'updated_at'])
    end
end
