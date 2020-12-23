class Problem < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :solutions, dependent: :destroy
  has_and_belongs_to_many :users
  has_and_belongs_to_many :problem_sets
  has_and_belongs_to_many :contests
end
