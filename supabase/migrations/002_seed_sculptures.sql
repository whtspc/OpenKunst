-- Seed existing sculpture data into Supabase
-- Run this after 001_initial_schema.sql

INSERT INTO public.sculptures (name, artist, year, description, materials, lat, lng, address, city, images, tags) VALUES
-- Nic Jonk sculptures (featured)
('Aarde en Water', 'Nic Jonk', NULL, 'Een sculptuur die de elementen aarde en water symboliseert, typisch voor het werk van Nic Jonk.', ARRAY['Brons'], 52.6712, 4.8356, 'Dolomiet', 'Heerhugowaard', ARRAY['https://commons.wikimedia.org/wiki/Special:FilePath/Aarde_en_Water_Nic_Jonk_Heerhugowaard_Dolomiet.JPG?width=800'], ARRAY['brons', 'natuur', 'symbolisch']),

('De Wachter', 'Nic Jonk', NULL, 'Een imposant bronzen beeld dat als wachter over de omgeving lijkt te waken.', ARRAY['Brons'], 52.6598, 4.8445, 'Westerweg', 'Heerhugowaard', ARRAY['https://commons.wikimedia.org/wiki/Special:FilePath/De_Wachter_Nic_Jonk_Westerweg_Heerhugowaard.jpg?width=800'], ARRAY['brons', 'figuratief', 'monumentaal']),

-- Other sculptures with images
('Pandabeer', 'Klaas van de Berg', NULL, 'Een sculptuur van een pandabeer, vernoemd naar de straat waar het beeld staat: de Reuzenpandasingel.', ARRAY['Steen'], 52.6589, 4.8201, 'Reuzenpandasingel', 'Heerhugowaard', ARRAY['https://commons.wikimedia.org/wiki/Special:FilePath/Pandabeer_Klaas_van_de_Berg_Reuzenpandasingel_Heerhugowaard.JPG?width=800'], ARRAY['steen', 'dier', 'figuratief']),

('Oostpoort-Arcadia', 'Lucien den Arend', NULL, 'Een monumentaal kunstwerk in de Reina Prinsen-Geerligstuin, onderdeel van een serie landschapskunstwerken.', ARRAY['Staal'], 52.6701, 4.8412, 'Reina Prinsen-Geerligstuin', 'Heerhugowaard', ARRAY['https://commons.wikimedia.org/wiki/Special:FilePath/Oostpoort-Arcadia_Lucien_den_Arend_Reina_Prinsen-Geerligstuin_Heerhugowaard.JPG?width=800'], ARRAY['staal', 'landschapskunst', 'monumentaal']),

('Vrouwen Uit Het Verzet', 'Elly Baltus', NULL, 'Een monument ter ere van de vrouwen die tijdens de Tweede Wereldoorlog in het verzet actief waren.', ARRAY['Brons'], 52.6645, 4.8267, 'Oostertocht', 'Heerhugowaard', ARRAY['https://commons.wikimedia.org/wiki/Special:FilePath/Vrouwen_Uit_Het_Verzet_Elly_Baltus_Oostertocht_Heerhugowaard.JPG?width=800'], ARRAY['brons', 'oorlogsmonument', 'figuratief']),

('Poezieboom', 'Peter Louman', NULL, 'Een kunstwerk in de vorm van een boom met poëtische elementen, dat literatuur en natuur combineert.', ARRAY['Metaal', 'Hout'], 52.6634, 4.8178, 'Diamant', 'Heerhugowaard', ARRAY['https://commons.wikimedia.org/wiki/Special:FilePath/Poezieboom_Peter_Louman_Diamant_Heerhugowaard.JPG?width=800'], ARRAY['metaal', 'literatuur', 'natuur']),

('Vrij als een vogel vogelvrij', 'Roland de Jong-Orlando', NULL, 'Een sculptuur die het thema vrijheid verkent door de metafoor van een vogel.', ARRAY['Brons'], 52.6556, 4.8312, 'Zuid', 'Heerhugowaard', ARRAY['https://commons.wikimedia.org/wiki/Special:FilePath/Vrij_als_een_vogel_vogelvrij_Roland_de_Jong-Orlando_Heerhugowaard.JPG?width=800'], ARRAY['brons', 'vogel', 'vrijheid']),

('Bloem in de knop - Pulserend hart', 'Wieslaw Ozmina', NULL, 'Een abstract kunstwerk dat de energie van een bloem in knop en een kloppend hart uitbeeldt.', ARRAY['Staal'], 52.6687, 4.8234, 'Butterhuizen', 'Heerhugowaard', ARRAY['https://commons.wikimedia.org/wiki/Special:FilePath/Bloem_in_de_knop-Pulserend_hart_Wies%C5%82aw_O%C5%BAmina_Heerhugowaard.JPG?width=800'], ARRAY['staal', 'abstract', 'natuur']),

('Capella', 'Marcel Smink', NULL, 'Een sculptuur geïnspireerd op de heldere ster Capella, onderdeel van het sterrenbeeld Voerman.', ARRAY['RVS'], 52.6623, 4.8489, 'Gerrit Rietveldweg', 'Heerhugowaard', ARRAY['https://commons.wikimedia.org/wiki/Special:FilePath/Capella_Marcel_Smink_Gerrit_Rietveldweg_Heerhugowaard1.JPG?width=800'], ARRAY['rvs', 'astronomie', 'abstract']),

-- Sculptures without images (using empty array - app will show placeholder)
('Moeder en Kind', 'Theo Mulder', NULL, 'Een bronzen sculptuur van een moeder met kind, geplaatst op het Raadhuisplein in het centrum van Heerhugowaard.', ARRAY['Brons'], 52.6673, 4.8305, 'Raadhuisplein', 'Heerhugowaard', ARRAY[]::TEXT[], ARRAY['brons', 'figuratief', 'familie']),

('Muzikale verbinding van drie pleinen', 'Adriaan Rees', NULL, 'Een kunstwerk dat de drie pleinen van het Stadshart met elkaar verbindt door middel van muzikale elementen.', ARRAY['Metaal'], 52.6652, 4.8348, 'Stationsplein', 'Heerhugowaard', ARRAY[]::TEXT[], ARRAY['metaal', 'muziek', 'abstract']),

('Koffiepot', 'Klaas Gubbels', NULL, 'Een karakteristiek beeld van een koffiepot door de bekende Nederlandse kunstenaar Klaas Gubbels, bekend om zijn koffiepot-thema.', ARRAY['Brons'], 52.6668, 4.8289, 'Stadshart', 'Heerhugowaard', ARRAY[]::TEXT[], ARRAY['brons', 'pop art', 'iconisch']),

('Aren', 'Robert Mayo', NULL, 'Een sculptuur die verwijst naar de agrarische geschiedenis van de regio met graanaren als motief.', ARRAY['Brons'], 52.6578, 4.8156, 'Westtangent', 'Heerhugowaard', ARRAY[]::TEXT[], ARRAY['brons', 'landbouw', 'geschiedenis']),

('Speeltuin NAP', 'Frank Halmans', NULL, 'Een kunstwerk in de openbare ruimte dat verwijst naar het Normaal Amsterdams Peil, relevant voor deze polder.', ARRAY['Divers'], 52.6701, 4.8178, 'Stadshart Noord', 'Heerhugowaard', ARRAY[]::TEXT[], ARRAY['interactief', 'water', 'speels']),

('Monument voor de Mensenrechten', 'Onbekend', NULL, 'Een monument gewijd aan de Universele Verklaring van de Rechten van de Mens.', ARRAY['Steen'], 52.6659, 4.8334, 'Stadshart', 'Heerhugowaard', ARRAY[]::TEXT[], ARRAY['steen', 'monument', 'mensenrechten']);
