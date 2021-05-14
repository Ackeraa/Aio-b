class AddFriendsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :followers, :jsonb, default: { 'total' => 0, 'followers' => [] }
    add_column :users, :following, :jsonb, default: { 'total' => 0, 'following' => [] }
  end
end
