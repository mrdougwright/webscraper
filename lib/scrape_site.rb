	# scrape http://www.naalamedacounty.org/meeting/day/

class ScrapeSite
	def self.naorg
		days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]

		days.each do |day|
			url = "http://www.naalamedacounty.org/meeting/day/" + day + ".html"
			page = ScrapeData.new(url)
			page.for_meeting
		end

		days
	end
end