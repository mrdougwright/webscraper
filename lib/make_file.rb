module MakeFile
	def self.with_url url, name=nil
		s = ScrapeData.new(url)
		f = File.open("#{name}_file.txt", 'w')
		f.write(s.comet_change.to_yaml)
		f.close
		puts "#{Dir.pwd}/#{f.path}"
	end
end
