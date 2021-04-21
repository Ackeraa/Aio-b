class SubmissionRecordsController < ApplicationController
  before_action :set_submission_record, only: [:show, :update, :destroy]

  def initialize
    puts "--------------------------------"
    puts "init"
  end
  # GET /submission_records
  def index

    @submission_records = SubmissionRecord.where(search_params)
                                          #.where.not(result: 'judging')
    render json: @submission_records
  end

  # GET /submission_records/1
  def show
    render json: @submission_record
  end

  # POST /submission_records
  def create
    @submission_record = SubmissionRecord.new(submission_record_params)

    if @submission_record.save
      render json: @submission_record, status: :created, location: @submission_record
    else
      render json: @submission_record.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /submission_records/1
  def update
    if @submission_record.update(submission_record_params)
      render json: @submission_record
    else
      render json: @submission_record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /submission_records/1
  def destroy
    @submission_record.destroy
  end

  private

    def search_params
      params.permit(:contest_id, :problem_id, :user_name)
            .delete_if { |key, value| value.blank? }
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_submission_record
      @submission_record = SubmissionRecord.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def submission_record_params
      params.fetch(:submission_record, {})
    end
end
