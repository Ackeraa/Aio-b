class Contest < ApplicationRecord
  has_many :contest_announcements, dependent: :destroy
  has_many :submission_records, dependent: :destroy
end
