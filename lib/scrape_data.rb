class ScrapeData
	def initialize(url)
		@page = FetchPage.from_url(url)
	end

	def comet_change # basic elements of a web page
		meta = @page.search('meta').select{|e| !e['property'].nil?}.map{|e| {e['property'] => e['content']} }
		meta.unshift({'title' => @page.title})
		meta.unshift({'page' => @page.uri.to_s.split(/:\/\//).last })
		desc = @page.search('meta').select{|e| e['name']=='Description'}.first
		meta << {'meta_description' => desc.attributes['content'].value}  unless desc.nil?
		meta << {'h1' => @page.at('h1').text}                             unless @page.at('h1').nil?
		meta << {'h2' => @page.search('h2').collect{|h2| h2.text.strip} } unless @page.at('h2').nil?
		meta << {'paragraphs' => @page.search('p').collect{|p| p.text.strip} }     unless @page.at('p').nil?
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
