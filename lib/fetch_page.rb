module FetchPage

	def self.from_url(url)
		Mechanize.new.get(url)
	end
end
