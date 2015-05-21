class ScrapeData
	def initialize(url)
		@page = FetchPage.from_url(url)
	end

	def comet_change
		meta = @page.search('meta').select{|e| !e['property'].nil?}.map{|e| {e['property'] => e['content']} }
		meta.unshift({'title' => @page.at('title').text})
		meta << {'meta_description' => @page.search('meta').select{|e| e['name']=='Description'}.first.attributes['content'].value}
		meta << {'h1' => @page.at('h1').text}
		meta << {'h2' => @page.search('h2').collect{|h2| h2.text} }
		meta << {'p' => @page.search('p').collect{|p| p.text} }
		meta
	end

	def for_places
		places = []
		@page.search('tr').each do |el|
			tmp_hash = {}
			tmp_hash[:time] = el.at('.date').text.strip unless el.at('.date').nil?

			info = el.at('.info')
			tmp_hash[:city] = info.at('.day_city').text.strip unless el.at('.day_city').nil?
			tmp_hash[:name] = info.at('.name').text.strip unless el.at('.name').nil?
			tmp_hash[:location_name] = info.at('.location_name').text.strip unless el.at('.location_name').nil?
			tmp_hash[:address] = info.at('.address').text.strip unless el.at('.address').nil?
			tmp_hash[:location_comment] = info.at('.location_comment').text.strip unless el.at('.location_comment').nil?
			places << tmp_hash
		end
		places
	end
end
