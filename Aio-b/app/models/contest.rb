class Contest < ApplicationRecord
  has_many :contest_announcements, dependent: :destroy
  has_many :submission_records, dependent: :destroy
  has_and_belongs_to_many :groups
  has_and_belongs_to_many :team_contest_ranks
  has_and_belongs_to_many :acm_contest_ranks
  has_and_belongs_to_many :oi_contest_ranks
  has_and_belongs_to_many :problems
end
