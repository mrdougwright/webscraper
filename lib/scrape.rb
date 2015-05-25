class Scrape
	def self.address_site(urls, scraper_method)
		urls.each do |url|
			page = ScrapeData.new(url)
			page.send(scraper_method).each { |location| Place.create(location) }
		end
	end
end