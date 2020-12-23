class Group < ApplicationRecord
  has_many :teams, dependent: :destroy
  has_and_belongs_to_many :contests
  has_and_belongs_to_many :users

  has_rich_text :response
end
