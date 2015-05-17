class ScrapeData
	def initialize(url)
		@page = FetchPage.from_url(url)
	end

	def for_meeting
		meetings = []
		@page.search('tr').each do |el|
			mtg_hash = {}
			mtg_hash[:time] = el.at('.date').text.strip unless el.at('.date').nil?
			info = el.at('.info')
			mtg_hash[:city] = info.at('.day_city').text.strip unless el.at('.day_city').nil?
			mtg_hash[:name] = info.at('.name').text.strip unless el.at('.name').nil?
			mtg_hash[:location_name] = info.at('.location_name').text.strip unless el.at('.location_name').nil?
			mtg_hash[:address] = info.at('.address').text.strip unless el.at('.address').nil?
			mtg_hash[:location_comment] = info.at('.location_comment').text.strip unless el.at('.location_comment').nil?
			meetings << mtg_hash
		end
		meetings
	end
end
