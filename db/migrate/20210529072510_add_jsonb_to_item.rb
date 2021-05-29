class AddJsonbToItem < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :test, :jsonb, defalut: {}
  end
end
