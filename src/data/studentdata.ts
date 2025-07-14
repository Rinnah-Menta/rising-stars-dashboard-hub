import defaultAvatar from '@/assets/default-avatar.png';

// Utility function to convert image name to proper avatar URL with fallback
const formatAvatarUrl = (imageName: string): string => {
  if (!imageName) return defaultAvatar;
  
  // Clean the name and replace spaces with %20 for URL encoding
  const cleanName = imageName.replace('src/assets/photos/', '').replace('.JPG', '.JPG');
  const encodedName = encodeURIComponent(cleanName);
  
  // Return GitHub URL with fallback
  return `https://gloriouschools.github.io/rising-star-connect/src/assets/photos/${encodedName}`;
};

// Fallback function for missing photos
const getAvatarWithFallback = (photoName?: string): string => {
  if (!photoName) return defaultAvatar;
  return formatAvatarUrl(photoName);
};

// Map student names to photo filenames (based on available photos)
const photoMap: Record<string, string> = {
  "Adriana Liam Mirimu": "ADRIANA LIAM MIRIMU.JPG",
  "Ahimbisibwe Emmanuel": "AHIMBISIBWE EMMANUEL.JPG",
  "Alba Promise Kobusingye": "ALBA PROMISE KOBUSINGYE.JPG",
  "Albara-U Yahaya Musoke": "ALBARA-U YAHAYA MUSOKE.JPG",
  "Amanyabyona Joseph Collins": "AMANYABYONA JOSEPH COLLINS.JPG",
  "Ankunda Liam": "ANKUNDA LIAM.JPG",
  "Atungire Elijah": "ATUNGIRE ELIJAH.JPG",
  "Ava Malaika Dhamuzungu": "AVA MALAIKA DHAMUZUNGU.JPG",
  "Bagabe Abel": "BAGABE ABEL.JPG",
  "Birungi Hidaya": "BIRUNGI HIDAYA.JPG",
  "Bwogi Deighton": "BWOGI DEIGHTON.JPG",
  "Byamukama Matthew Charles": "BYAMUKAMA MATTHEW CHARLES.JPG",
  "Dhedonga Rehema Marina": "DHEDONGA REHEMA MARINA.JPG",
  "Eglah Abi Gara": "EGLAH ABI GARA.JPG",
  "Eli Timao Edube": "ELI TIMAO EDUBE.JPG",
  "Favour Gideon Mayiga": "FAVOUR GIDEON MAYIGA.JPG",
  "Itungo Lionel Ruta": "ITUNGO LIONEL RUTA.JPG",
  "Jake William Katende": "JAKE WILLIAM KATENDE.JPG",
  "Jean Bright Jooga": "JEAN BRIGHT  JOOGA.JPG",
  "Jean Peter Ddamulira": "JEAN PETER DDAMULIRA.JPG",
  "Jedidiah Kahuma Kazooba": "JEDIDIAH KAHUMA KAZOOBA.JPG",
  "Kalule Victor Leander": "KALULE VICTOR LEANDER.JPG",
  "Katende Josiah Charles": "KATENDE JOSIAH CHARLES.JPG",
  "Katongole Gertrude": "KATONGOLE GERTRUDE.JPG",
  "Katongole Mona": "KATONGOLE MONA.JPG",
  "Katumba Dalton Surprise": "KATUMBA DALTON SURPRISE.JPG",
  "Kaweesi Jayden Hope": "KAWEESI JAYDEN HOPE.JPG",
  "Kijjambu Mark Morgan": "KIJJAMBU MARK MORGAN.JPG",
  "Kirabo Bryson Kyle": "KIRABO BRYSON KYLE.JPG",
  "Kobufura Ashley Krysten": "KOBUFURA ASHLEY KRYSTEN.JPG",
  "Krystabell Ariana Wavamunno": "KRYSTABELL ARIANA WAVAMUNNO.JPG",
  "Kukunda Kirsten": "KUKUNDA KIRSTEN.JPG",
  "Levi Gataali Muzima": "LEVI GATAALI MUZIMA.JPG",
  "Lubega Keron": "LUBEGA KERON.JPG",
  "Matsiko Dan": "MATSIKO DAN.JPG",
  "Mugenyi Calvin": "MUGENYI CALVIN.JPG",
  "Mukisa Jesse": "MUKISA JESSE.JPG",
  "Mukula Odysseus Bridgeous": "MUKULA ODYSSEUS BRIDGEOUS.JPG",
  "Mulungi Adonai": "MULUNGI ADONAI.JPG",
  "Mulwana Bernice": "MULWANA BERNICE.JPG",
  "Mutebi Hafizu Kigongo": "MUTEBI HAFIZU KIGONGO.JPG",
  "Mutyaba Keron": "MUTYABA KERON.JPG",
  "Muwanguzi Israel": "MUWANGUZI ISRAEL.JPG",
  "Mwiza Atalia Abrielle": "MWIZA ATALIA ABRIELLE.JPG",
  "Mwiza Martha Kimberly": "MWIZA MARTHA KIMBERLY.JPG",
  "Nabukenya Samantha": "NABUKENYA SAMANTHA.JPG",
  "Nabuule Eliana Malaika Kaye": "NABUULE ELIANA MALAIKA KAYE.JPG",
  "Nabuyondo Nairah": "NABUYONDO NAIRAH.JPG",
  "Nakaddu Ellyvick": "NAKADDU ELLYVICK.JPG",
  "Nakamatte Norah Christine": "NAKAMATTE NORAH CHRISTINE.JPG",
  "Nakanwagi Jean Alba": "NAKANWAGI JEAN ALBA.JPG",
  "Nakayiwa Esther": "NAKAYIWA ESTHER.JPG",
  "Nakitto Rashimah": "NAKITTO RASHIMAH.JPG",
  "Nalubowa Allison Juliet": "NALUBOWA ALLISON JULIET.JPG",
  "Nalutaaya Petronillah": "NALUTAAYA PETRONILLAH.JPG",
  "Namakula Sophia": "NAMAKULA SOPHIA.JPG",
  "Nambajjwe Valeria": "NAMBAJJWE VALERIA.JPG",
  "Nansubuga Theo Elsie": "NANSUBUGA THEO ELSIE.JPG",
  "Natumi Shahid Papa": "NATUMI SHAHID PAPA.JPG",
  "Nazeba Leo": "NAZEBA LEO.JPG",
  "Nowamani Sharapova": "NOWAMANI SHARAPOVA.JPG",
  "Ntambazi Jeison Joseph": "NTAMBAZI JEISON JOSEPH.JPG",
  "Nyabun Bith": "NYABUN BITH.JPG",
  "Nyesiga Othniel": "NYESIGA OTHNIEL.JPG",
  "Odeke Miracle Daniel": "ODEKE MIRACLE DANIEL.JPG",
  "Ojambo Devlin Paul": "OJAMBO DEVLIN PAUL.JPG",
  "Owori Calvin Franklin": "OWORI CALVIN FRANKLIN.JPG",
  "Pria Angel": "PRIA ANGEL.JPG",
  "Rukundo Elizabeth": "RUKUNDO ELIZABETH.JPG",
  "Rukundo Faith Canty": "RUKUNDO FAITH CANTY.JPG",
  "Ssempa Malcom Mathew": "SSEMPA MALCOM MATHEW.JPG",
  "Ssempebwa Jonathan Gideon": "SSEMPEBWA JONATHAN GIDEON.JPG",
  "Ssengendo Victoria Miracle": "SSENGENDO VICTORIA MIRACLE.JPG",
  "Ssengooba Tendo Enock": "SSENGOOBA TENDO ENOCK.JPG",
  "Ssenyimba Don Elijah": "SSENYIMBA DON ELIJAH.JPG",
  "Ssenyonga Elijah Adrian": "SSENYONGA ELIJAH ADRIAN.JPG",
  "Suku Holly Laelle": "SUKU HOLLY LAELLE.JPG",
  "Tamara Ava Mulungi Ndugwa": "TAMARA AVA MULUNGI NDUGWA.JPG",
  "Twebaze Esther": "TWEBAZE ESTHER.JPG",
  "Wasajja Charles Dickens": "WASAJJA CHARLES DICKENS.JPG"
};

// Function to get photo filename for a student name
const getPhotoFilename = (name: string): string | undefined => {
  // Direct match
  if (photoMap[name]) return photoMap[name];
  
  // Try partial matches for similar names
  const keys = Object.keys(photoMap);
  const similarKey = keys.find(key => {
    const keyParts = key.toLowerCase().split(' ');
    const nameParts = name.toLowerCase().split(' ');
    return keyParts.some(part => nameParts.some(namePart => part.includes(namePart) || namePart.includes(part)));
  });
  
  return similarKey ? photoMap[similarKey] : undefined;
};

// Student data organized by class with required fields only
const studentsByClass = {
  "JUNIOR_ONE": [
    { "name": "Nassali Yasmeen", "dob": "20.07.2016", "school_pay_code": "1004673489" },
    { "name": "Mulungi Divine Gabriella", "dob": "28.02.2018", "school_pay_code": "1004632470" },
    { "name": "Nandegeya Samantha", "dob": "13.10.2017", "school_pay_code": "1004681195" },
    { "name": "Gwokyalya Blessing Birabwa", "dob": "4.08.2018", "school_pay_code": "1003357779" },
    { "name": "Kabuye Harrison Laban", "dob": "20.06.2019", "school_pay_code": "1004015723" },
    { "name": "Faith Merabu Nansikombi Kalibbala", "dob": "16.12.2018", "school_pay_code": "1003933840" },
    { "name": "Muganzi Nissi Eilah", "dob": "13.05.2019", "school_pay_code": "1003923022" },
    { "name": "Louis Josiah Tumwebaze", "dob": "8.09.2018", "school_pay_code": "1003489228" },
    { "name": "Nakasaabo Tendo", "dob": "1.01.2018", "school_pay_code": "1003357768" },
    { "name": "Eden Mutesa Agaba", "dob": "18.12.2017", "school_pay_code": "1003357778" },
    { "name": "Harry Jotham Ssemwanga", "dob": "19.02.2019", "school_pay_code": "1003357737" },
    { "name": "Nagginda Eirah", "dob": "28.09.2018", "school_pay_code": "1003357741" },
    { "name": "Moses Imran Nsereko", "dob": "12.05.2018", "school_pay_code": "1003357724" },
    { "name": "Kato Hadharu Mutebi", "dob": "24.12.2018", "school_pay_code": "1003357745" },
    { "name": "Babirye Hayat Ndagire", "dob": "24.12.2018", "school_pay_code": "1003357746" },
    { "name": "Nabasirye Chloe", "dob": "17.01.2019", "school_pay_code": "1003357728" },
    { "name": "Emmanuel Wafula", "dob": "15.11.2017", "school_pay_code": "1003357760" },
    { "name": "Nalubega Kiara Mary", "dob": "9.02.2019", "school_pay_code": "1003357735" },
    { "name": "Ssemwanga Liam", "dob": "18.9.2018", "school_pay_code": "1003420784" },
    { "name": "Nyombi Dylan Adamz", "dob": "23.10.2018", "school_pay_code": "1003879016" },
    { "name": "Kaylah Nduta", "dob": "25.07.2019", "school_pay_code": "1003384176" },
    { "name": "Armani Robinah Nabisaalu", "dob": "13.07.2019", "school_pay_code": "1003383218" },
    { "name": "Lynah Aamal Ssekeba", "dob": "25.04.2019", "school_pay_code": "1004286269" },
    { "name": "Ntwari Maurice Corliss", "dob": "4.05.2018", "school_pay_code": "1004632138" },
    { "name": "Namulindwa Tessy Mercy", "dob": "30.05.2019", "school_pay_code": "1004596935" },
    { "name": "Akampurira Audrey", "dob": "26.06.2017", "school_pay_code": "1007002123" },
    { "name": "Asma Adam", "dob": "3.12.2017", "school_pay_code": "1008860444" },
    { "name": "Islam Adam", "dob": "3.12.2017", "school_pay_code": "1008860353" },
    { "name": "Matovu Angelica Lisa", "dob": "31.07.2018", "school_pay_code": "1004686360" },
    { "name": "Katimbo Maria Antonia", "dob": "17.11.2018", "school_pay_code": "1004614527" },
    { "name": "Azaria Mulungi Ssejjuko", "dob": "20.04.2019", "school_pay_code": "1004330366" },
    { "name": "Angelina Karungi", "dob": "11.11.2018", "school_pay_code": "1003916749" },
    { "name": "Kakule Abraham Raphael", "dob": "27.02.2018", "school_pay_code": "1003357781" },
    { "name": "Matovu Ramsey Musa", "dob": "18.07.2019", "school_pay_code": "1006882895" },
    { "name": "Manzi Israel Mwanza", "dob": "19.07.2018", "school_pay_code": "1004190981" },
    { "name": "Rahiah Namwanje Mirembe", "dob": "2.05.2019", "school_pay_code": "1004615339" },
    { "name": "Kayanja Jeremiah", "dob": "25.01.2019", "school_pay_code": "1003357729" },
    { "name": "Lubwama Jamal", "dob": "7.10.2018", "school_pay_code": "1003357748" },
    { "name": "Mulungi Meaghan", "dob": "7.02.2019", "school_pay_code": "1003357739" },
    { "name": "Hannah Isabel Nantale", "dob": "24.09.2018", "school_pay_code": "1003357764" },
    { "name": "Nahabwe Israel Karenzyo", "dob": "4.09.2018", "school_pay_code": "1008866266" },
    { "name": "Mayanja Zane", "dob": "16.02.2019", "school_pay_code": "1008774187" },
    { "name": "Namiyah Tazlin Hudah", "dob": "3.08.2017", "school_pay_code": "1003357770" },
    { "name": "Nammanda Mangadalene Ariella", "dob": "18.03.2019", "school_pay_code": "1003357780" },
    { "name": "Namuganyi Evelyn Hope", "dob": "19.07.2019", "school_pay_code": "1007993015" },
    { "name": "Ssegawa Keith Muwanguzi", "dob": "17.10.2018", "school_pay_code": "1003357744" },
    { "name": "Shemaiah Musiige", "dob": "12.3.2019", "school_pay_code": "1006577098" },
    { "name": "Bianca Sabrina Kaaje", "dob": "28.12.2019", "school_pay_code": "1004293468" },
    { "name": "Kirabo Ezra", "dob": "", "school_pay_code": "" },
    { "name": "Kakeeto Eliana", "dob": "", "school_pay_code": "" },
    { "name": "Kakeeto Prosper", "dob": "", "school_pay_code": "" }
  ],
  "JUNIOR_TWO": [
    { "name": "Mugerwa Joram", "dob": "3.04.2014", "school_pay_code": "1008661285" },
    { "name": "Tusiime Tatyana", "dob": "2.10.2017", "school_pay_code": "1008878716" },
    { "name": "Kemigisha Queen Latifah", "dob": "27.05.2017", "school_pay_code": "1008800630" },
    { "name": "Ssenyimba Aaron", "dob": "", "school_pay_code": "" },
    { "name": "Kirabo Bryson Kyle", "dob": "", "school_pay_code": "" },
    { "name": "Kaweesi Jayden", "dob": "", "school_pay_code": "" },
    { "name": "Mayanja Shakir", "dob": "", "school_pay_code": "" },
    { "name": "Ssempeebwa Gideon", "dob": "", "school_pay_code": "" },
    { "name": "Ssekamanya Ethan", "dob": "", "school_pay_code": "" },
    { "name": "Kalule Victor", "dob": "", "school_pay_code": "" },
    { "name": "Bwogi Deigton", "dob": "", "school_pay_code": "" },
    { "name": "Amanyabyona Collins", "dob": "", "school_pay_code": "" },
    { "name": "Byamukama Charles", "dob": "", "school_pay_code": "" },
    { "name": "Mastiko Dan", "dob": "", "school_pay_code": "" },
    { "name": "Zziwa Ashim", "dob": "", "school_pay_code": "" },
    { "name": "Mutyaba Keron", "dob": "", "school_pay_code": "" },
    { "name": "Kijjambu Mark", "dob": "", "school_pay_code": "" },
    { "name": "Bagabe Abel Mugisha", "dob": "", "school_pay_code": "" },
    { "name": "Ntambazi Jeison", "dob": "", "school_pay_code": "" },
    { "name": "Katumba Dalton.S", "dob": "", "school_pay_code": "" },
    { "name": "Edube Eli Timao", "dob": "", "school_pay_code": "" },
    { "name": "Ankunda Liam", "dob": "", "school_pay_code": "" },
    { "name": "Ojambo Delvin", "dob": "", "school_pay_code": "" },
    { "name": "Nazeba Leo", "dob": "", "school_pay_code": "" },
    { "name": "Kaweesa Treasure", "dob": "", "school_pay_code": "" },
    { "name": "Katende Jake.W", "dob": "", "school_pay_code": "" },
    { "name": "Nakitto Rashimah", "dob": "", "school_pay_code": "" },
    { "name": "Twebaze Esther", "dob": "", "school_pay_code": "" },
    { "name": "Tamara Ava Ndugwa", "dob": "", "school_pay_code": "" },
    { "name": "Birungi Hidayah", "dob": "", "school_pay_code": "" },
    { "name": "Nansubuga Elsie Theo", "dob": "", "school_pay_code": "" },
    { "name": "Katongole Mona", "dob": "", "school_pay_code": "" },
    { "name": "Kobufura Ashely", "dob": "", "school_pay_code": "" },
    { "name": "Nabuule Eliana", "dob": "", "school_pay_code": "" },
    { "name": "Mirimu Adriana.L", "dob": "", "school_pay_code": "" },
    { "name": "Rukundo Elizabeth", "dob": "", "school_pay_code": "" },
    { "name": "Ibanda Hanan", "dob": "", "school_pay_code": "" },
    { "name": "Nyabun Bith Mary", "dob": "", "school_pay_code": "" },
    { "name": "Namakula Sophia", "dob": "", "school_pay_code": "" },
    { "name": "Nakamatte Norah", "dob": "", "school_pay_code": "" },
    { "name": "Mulungi Adonai", "dob": "", "school_pay_code": "" },
    { "name": "Wavamunno Krystabel", "dob": "", "school_pay_code": "" },
    { "name": "Dhamuzungu Ava Rayana", "dob": "", "school_pay_code": "" },
    { "name": "Malaika Candice", "dob": "", "school_pay_code": "" }
  ],
  "JUNIOR_THREE": [
    { "name": "Kansiime Tasha Nelia", "dob": "30.07.2016", "school_pay_code": "1008878766" },
    { "name": "Mumbejja Rowena", "dob": "15.12.2016", "school_pay_code": "1008813908" },
    { "name": "Adriana Faith Ithungo", "dob": "1.11.2016", "school_pay_code": "1009495258" },
    { "name": "Ahmed Adam", "dob": "21.03.2015", "school_pay_code": "1008860482" },
    { "name": "Ahimbisibwe Emmanuel", "dob": "", "school_pay_code": "" },
    { "name": "Ddamulira Jean Peter", "dob": "", "school_pay_code": "" },
    { "name": "Eglah Abi Gara", "dob": "", "school_pay_code": "" },
    { "name": "Jedidiah Kahuma Kazooba", "dob": "", "school_pay_code": "" },
    { "name": "Kaweesa Treasure Ethan", "dob": "", "school_pay_code": "" },
    { "name": "Kobusingye Alba Promise", "dob": "", "school_pay_code": "" },
    { "name": "Kukunda Kirsten", "dob": "", "school_pay_code": "" },
    { "name": "Laella Holly Suku Gatah", "dob": "", "school_pay_code": "" },
    { "name": "Lubega Keron", "dob": "", "school_pay_code": "" },
    { "name": "Mukisa Imran Muyomba", "dob": "", "school_pay_code": "" },
    { "name": "Mukisa Jesse", "dob": "", "school_pay_code": "" },
    { "name": "Mutebi Hafizu", "dob": "", "school_pay_code": "" },
    { "name": "Nakafu Linda Valeria", "dob": "", "school_pay_code": "" },
    { "name": "Nakalyango Katrina Leah", "dob": "", "school_pay_code": "" },
    { "name": "Nakanwagi Jean Alba", "dob": "", "school_pay_code": "" },
    { "name": "Nalutaaya Petronillah", "dob": "", "school_pay_code": "" },
    { "name": "Nambajjwe Valeria", "dob": "", "school_pay_code": "" },
    { "name": "Natumi Shahid Papa", "dob": "", "school_pay_code": "" },
    { "name": "Ntume Tendo Enock", "dob": "", "school_pay_code": "" },
    { "name": "Nyesiga Othiniel", "dob": "", "school_pay_code": "" },
    { "name": "Odeke Miracle Daniel", "dob": "", "school_pay_code": "" },
    { "name": "Owori Calvin Franwin", "dob": "", "school_pay_code": "" },
    { "name": "Rehema Dhedonga Marina", "dob": "", "school_pay_code": "" },
    { "name": "Reon Elijah Atungire", "dob": "", "school_pay_code": "" },
    { "name": "Ssempa Malcom Matthew", "dob": "", "school_pay_code": "" },
    { "name": "Ssengendo Victoria", "dob": "", "school_pay_code": "" },
    { "name": "Avery", "dob": "", "school_pay_code": "" },
    { "name": "Favour", "dob": "", "school_pay_code": "" }
  ],
  "JUNIOR_FOUR": [
    { "name": "Mohammed Adam", "dob": "1.01.2014", "school_pay_code": "1008860542" },
    { "name": "Nalubowa Allison .J.", "dob": "", "school_pay_code": "" },
    { "name": "Kiyaga Amantha .N.", "dob": "", "school_pay_code": "" },
    { "name": "Itungo Lionel Ruta", "dob": "", "school_pay_code": "" },
    { "name": "Pria Angel", "dob": "", "school_pay_code": "" },
    { "name": "Muzima Levi Gatali", "dob": "", "school_pay_code": "" },
    { "name": "Ssenyonga Elijah .A.", "dob": "", "school_pay_code": "" },
    { "name": "Mwiza Martha .K.", "dob": "", "school_pay_code": "" },
    { "name": "Atalia Mwiza .A.", "dob": "", "school_pay_code": "" },
    { "name": "Katongole .N. Gertrude", "dob": "", "school_pay_code": "" },
    { "name": "Rukundo Faith Canty", "dob": "", "school_pay_code": "" },
    { "name": "Nabuyondo Nairah", "dob": "", "school_pay_code": "" },
    { "name": "Katende Josiah .C.", "dob": "", "school_pay_code": "" },
    { "name": "Mukula Odysseus .B.", "dob": "", "school_pay_code": "" },
    { "name": "Muwanguzi Israel .N.", "dob": "", "school_pay_code": "" },
    { "name": "Nowamani Sharapova", "dob": "", "school_pay_code": "" },
    { "name": "Nakaddu Ellyvick", "dob": "", "school_pay_code": "" },
    { "name": "Jooga Jean Bright", "dob": "", "school_pay_code": "" },
    { "name": "Nakayiwa Esther", "dob": "", "school_pay_code": "" },
    { "name": "Musoke Albara-u.", "dob": "", "school_pay_code": "" },
    { "name": "Mugenyi Calvin", "dob": "", "school_pay_code": "" },
    { "name": "Mulwana Bernice", "dob": "", "school_pay_code": "" }
  ],
  "JUNIOR_FIVE": [
    { "name": "Kakule Abraham Raphael", "dob": "27.02.2018", "school_pay_code": "1003357781" },
    { "name": "Matovu Ramsey Musa", "dob": "18.07.2019", "school_pay_code": "1006882895" },
    { "name": "Manzi Israel Mwanza", "dob": "19.07.2018", "school_pay_code": "1004190981" },
    { "name": "Rahiah Namwanje Mirembe", "dob": "2.05.2019", "school_pay_code": "1004615339" },
    { "name": "Kayanja Jeremiah", "dob": "25.01.2019", "school_pay_code": "1003357729" },
    { "name": "Lubwama Jamal", "dob": "7.10.2018", "school_pay_code": "1003357748" },
    { "name": "Mulungi Meaghan", "dob": "7.02.2019", "school_pay_code": "1003357739" },
    { "name": "Hannah Isabel Nantale", "dob": "24.09.2018", "school_pay_code": "1003357764" },
    { "name": "Nahabwe Israel Karenzyo", "dob": "4.09.2018", "school_pay_code": "1008866266" },
    { "name": "Mayanja Zane", "dob": "16.02.2019", "school_pay_code": "1008774187" },
    { "name": "Namiyah Tazlin Hudah", "dob": "3.08.2017", "school_pay_code": "1003357770" },
    { "name": "Nammanda Mangadalene Ariella", "dob": "18.03.2019", "school_pay_code": "1003357780" },
    { "name": "Namuganyi Evelyn Hope", "dob": "19.07.2019", "school_pay_code": "1007993015" },
    { "name": "Ssegawa Keith Muwanguzi", "dob": "17.10.2018", "school_pay_code": "1003357744" },
    { "name": "Shemaiah Musiige", "dob": "12.3.2019", "school_pay_code": "1006577098" },
    { "name": "Bianca Sabrina Kaaje", "dob": "28.12.2019", "school_pay_code": "1004293468" }
  ],
  "JUNIOR_SIX": [
    { "name": "Kakeeto Eliana", "dob": "", "school_pay_code": "" },
    { "name": "Kakeeto Prosper", "dob": "", "school_pay_code": "" }
  ]
};

// Interface for User with extended profile
export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'parent' | 'pupil' | 'non-teaching';
  name: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  address: string;
  title?: string;
  gender?: string;
  subject?: string;
  department: string;
  qualification: string;
  experience: string;
  joinDate: string;
  bio: string;
  emergencyContact: string;
  emergencyPhone: string;
  avatar?: string;
  class?: string;
  children?: string[];
  accountStatus: 'active' | 'inactive' | 'suspended' | 'archived' | 'expelled';
  dateOfBirth?: string;
  schoolPayCode?: string;
}

// Export studentsByClass for backward compatibility
export { studentsByClass };

// Convert student data to User format
export const localStudentDatabase = {
  studentsByClass,
  users: Object.entries(studentsByClass).flatMap(([className, students], classIndex) =>
    students.map((student, index) => {
      const globalId = (classIndex * 1000) + index + 1;
      const imageName = getPhotoFilename(student.name);
      
      return {
        id: globalId.toString(),
        email: `${student.name.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, '.')}@pupil.springingstars.ac.ug`,
        password: 'pupil123',
        role: 'pupil' as const,
        name: student.name,
        firstName: student.name.split(' ')[0] || '',
        middleName: student.name.split(' ').length > 2 ? student.name.split(' ').slice(1, -1).join(' ') : '',
        lastName: student.name.split(' ').pop() || '',
        phone: `+256 77${Math.floor(1000000 + Math.random() * 9000000)}`,
        address: 'Kampala, Uganda',
        title: '',
        gender: Math.random() > 0.5 ? 'male' : 'female',
        subject: 'All Subjects',
        department: 'Primary',
        qualification: 'PLE Candidate',
        experience: 'N/A',
        joinDate: '2024-01-01',
        bio: `A dedicated student at Springing Stars Junior School studying in ${className.replace(/_/g, ' ')}.`,
        emergencyContact: 'Parent/Guardian',
        emergencyPhone: `+256 77${Math.floor(1000000 + Math.random() * 9000000)}`,
        avatar: getAvatarWithFallback(imageName),
        class: className.replace(/_/g, ' '),
        accountStatus: 'active' as const,
        dateOfBirth: student.dob,
        schoolPayCode: student.school_pay_code
      };
    })
  )
};
