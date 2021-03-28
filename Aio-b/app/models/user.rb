# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates_format_of :name, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable,
         :confirmable,
         :omniauthable,
         :authentication_keys => [:email, :name]
  include DeviseTokenAuth::Concerns::User


end
