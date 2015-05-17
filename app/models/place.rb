class Place < ActiveRecord::Base
	attr_accessible \
		:name
		:day
		:time
		:location_name
		:location_comment
		:address
		:city
end
