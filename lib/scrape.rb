# script run once to collect data into db
class Scrape
	def self.site(root_url)
		days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

		days.each do |day|
			url = root_url + day + ".html"
			page = ScrapeData.new(url)

			page.for_places.each do |location|
				location.merge!(day: day)
				Place.create(location) # write data to db
			end
		end
	end
end