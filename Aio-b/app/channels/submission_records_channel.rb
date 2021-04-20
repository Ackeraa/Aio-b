class SubmissionRecordsChannel < ApplicationCable::Channel
  def subscribed
    stream =  "submission_#{params[:user_id] || 0}_#{params[:problem_id] || 0}"
    stream_from stream
  end

  def unsubscribed

  end
end
