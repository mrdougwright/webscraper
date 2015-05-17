class CreatePlaces < ActiveRecord::Migration
	def change
		create_table :places do |t|
			t.string :name
			t.string :day # h3
			t.string :time # date
			t.string :location_name
			t.string :location_comment
			t.string :address
			t.string :city # day_city

			t.timestamps null: false
		end
	end
end
