class Group < ApplicationRecord
  has_many :teams, dependent: :destroy
  has_many :contests

  has_rich_text :response
end
