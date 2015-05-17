class FetchPage
	def initialize
		@mechanize = Mechanize.new
	end

	def from_url(url)
		@mechanize.get(url)
	end
end