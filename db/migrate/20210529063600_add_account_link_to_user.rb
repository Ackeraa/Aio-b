class AddAccountLinkToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :github, :string
    add_column :users, :oj_accounts, :jsonb, defalut: {}
  end
end
