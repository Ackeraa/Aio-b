class CreateLanguages < ActiveRecord::Migration[6.0]
  def change
    create_table :languages do |t|
      t.string :source
      t.jsonb :allowled_languages

      t.timestamps
    end
  end
end
