class OiContestRank < ApplicationRecord
  has_and_belongs_to_many :contests
end
