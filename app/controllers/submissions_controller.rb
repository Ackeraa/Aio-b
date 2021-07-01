class SubmissionsController < ApplicationController
  before_action :set_submission, only: [:show, :update, :destroy]
  before_action :set_page, only: [:search]

  def initialize
  end
  # GET /submissions
  def index
    @submissions = Submission.where(search_params)
                                          #.where.not(result: 'judging')
    render json: @submissions
  end

  # GET /submissions/search
  def search
    if params[:addition].nil?
      total = Submission.count
      @submissions = Submission.order(id: :desc).limit(20).offset(@page * 20)
    else
      total = Submission.where(search_params).count
      p "FUCL", search_params, total
      @submissions = Submission.where(search_params).order(id: :desc).limit(20).offset(@page * 20)
    end
    render json: { total: total, submissions: @submissions.to_json }
  end

  # GET /submissions/1
  def show
    render json: @submission
  end

  # POST /submissions
  def create
    @submission = Submission.new(submission_params)

    if @submission.save
      render json: @submission, status: :created, location: @submission
    else
      render json: @submission.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /submissions/1
  def update
    if @submission.update(submission_params)
      render json: @submission
    else
      render json: @submission.errors, status: :unprocessable_entity
    end
  end

  # DELETE /submissions/1
  def destroy
    @submission.destroy
  end

  private

    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    def search_params
       JSON.parse(params[:addition], { symbolize_names: true })
    end

    def set_submission
      @submission = Submission.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def submission_params
      params.fetch(:submission, {})
    end
end
