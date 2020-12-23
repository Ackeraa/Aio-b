class ProblemSetsController < ApplicationController
  before_action :set_problem_set, only: [:show, :update, :destroy]

  # GET /problem_sets
  def index
    @problem_sets = ProblemSet.all

    render json: @problem_sets
  end

  # GET /problem_sets/1
  def show
    render json: @problem_set
  end

  # POST /problem_sets
  def create
    @problem_set = ProblemSet.new(problem_set_params)

    if @problem_set.save
      render json: @problem_set, status: :created, location: @problem_set
    else
      render json: @problem_set.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /problem_sets/1
  def update
    if @problem_set.update(problem_set_params)
      render json: @problem_set
    else
      render json: @problem_set.errors, status: :unprocessable_entity
    end
  end

  # DELETE /problem_sets/1
  def destroy
    @problem_set.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_problem_set
      @problem_set = ProblemSet.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def problem_set_params
      params.fetch(:problem_set, {})
    end
end
