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
  "PRE_PRIMARY_CLASS_HERONS": [
    { "name": "Byamukama Peter Micheal", "dob": "", "school_pay_code": "" },
    { "name": "Dhedonga Jenovic", "dob": "", "school_pay_code": "" },
    { "name": "Karungi Myrah", "dob": "", "school_pay_code": "" },
    { "name": "Matovu Jayden Dirham", "dob": "", "school_pay_code": "" },
    { "name": "Kalungi Treasure Divine", "dob": "", "school_pay_code": "" },
    { "name": "Wokyalya Hannah", "dob": "", "school_pay_code": "" },
    { "name": "Namirembe Ariella Masembe", "dob": "", "school_pay_code": "" },
    { "name": "Kaganzi Tyler", "dob": "", "school_pay_code": "" },
    { "name": "Ssenyimba Dollars Raphaella", "dob": "", "school_pay_code": "" },
    { "name": "Kayemba Wynn", "dob": "", "school_pay_code": "" },
    { "name": "Nalukwago Rania", "dob": "", "school_pay_code": "" },
    { "name": "Najjingo Hannan", "dob": "", "school_pay_code": "" },
    { "name": "Tebusweke Jamirah", "dob": "", "school_pay_code": "" },
    { "name": "Mawanda Jude Quincy", "dob": "", "school_pay_code": "" },
    { "name": "Hobe Adriel Abana", "dob": "", "school_pay_code": "" },
    { "name": "Sserunkuma Hashim", "dob": "", "school_pay_code": "" },
    { "name": "Kaycee King Kibuuka", "dob": "", "school_pay_code": "" },
    { "name": "Kigongo Nathaniel Seth", "dob": "", "school_pay_code": "" },
    { "name": "Mulwana Esther Briana", "dob": "", "school_pay_code": "" },
    { "name": "Kakembo Ramaal", "dob": "", "school_pay_code": "" },
    { "name": "Mbabazi Ariana Kenganzi", "dob": "", "school_pay_code": "" },
    { "name": "Kamara Corban Johnson", "dob": "", "school_pay_code": "" },
    { "name": "Atwine Darren", "dob": "", "school_pay_code": "" },
    { "name": "Ariella Bateta", "dob": "", "school_pay_code": "" },
    { "name": "Sitenda Mildred", "dob": "", "school_pay_code": "" },
    { "name": "Mirembe Kayla", "dob": "", "school_pay_code": "" },
    { "name": "Dhamuzungu Wisdom Destiny", "dob": "", "school_pay_code": "" },
    { "name": "Hope Namale", "dob": "", "school_pay_code": "" },
    { "name": "Kasagga Jaleed Icra", "dob": "", "school_pay_code": "" },
    { "name": "Jesse Mugaiga", "dob": "", "school_pay_code": "" }
  ],
  "HEADSTART_CLASS_DAFFODILS": [
    { "name": "Masiga Zoey Atarah", "dob": "", "school_pay_code": "" },
    { "name": "Nina Kikuwa Ariella Mirembe", "dob": "", "school_pay_code": "" },
    { "name": "Nakawunde Cynthia Elsie Kaye", "dob": "", "school_pay_code": "" },
    { "name": "Mirembe Hazel Kamusiime", "dob": "", "school_pay_code": "" },
    { "name": "Muruya Yvonne Blessing", "dob": "", "school_pay_code": "" },
    { "name": "Nziza Daniel", "dob": "", "school_pay_code": "" },
    { "name": "Mutyaba Noella Kerisha", "dob": "", "school_pay_code": "" },
    { "name": "Ariella Kwikiriza", "dob": "", "school_pay_code": "" },
    { "name": "Ssekidde Brian Ian", "dob": "", "school_pay_code": "" },
    { "name": "Upendo Eliana Edube", "dob": "", "school_pay_code": "" },
    { "name": "Tamale Israel", "dob": "", "school_pay_code": "" },
    { "name": "Nalugga Amaris Keza", "dob": "", "school_pay_code": "" },
    { "name": "Arinda Ezekiel", "dob": "", "school_pay_code": "" },
    { "name": "Namulema Clara Michelle", "dob": "", "school_pay_code": "" },
    { "name": "Muyomba Gabriella Manuella", "dob": "", "school_pay_code": "" },
    { "name": "Tebusweke Abdul Rahman", "dob": "", "school_pay_code": "" },
    { "name": "Ngobi Raymond", "dob": "", "school_pay_code": "" },
    { "name": "Nalubwama Ann Racheal", "dob": "", "school_pay_code": "" },
    { "name": "Ilhan Mousah", "dob": "", "school_pay_code": "" },
    { "name": "Mpanya Ethan", "dob": "", "school_pay_code": "" },
    { "name": "Muhindo Malcom Christian", "dob": "", "school_pay_code": "" },
    { "name": "Balinda Jerome Mugaiga", "dob": "", "school_pay_code": "" },
    { "name": "Musiige Hezekiah", "dob": "", "school_pay_code": "" },
    { "name": "Kiggundu Liam Mukisa", "dob": "", "school_pay_code": "" },
    { "name": "Nabukenya Amaal Kirabo", "dob": "", "school_pay_code": "" },
    { "name": "Agaba Riley Katende", "dob": "", "school_pay_code": "" },
    { "name": "Manuella Nakkazi Nicole", "dob": "", "school_pay_code": "" },
    { "name": "Mercy Ampumuza", "dob": "", "school_pay_code": "" },
    { "name": "Amaris Keza", "dob": "", "school_pay_code": "" }
  ],
  "BEGINNER_CLASS_CARNATIONS": [
    { "name": "Kimberly Slowson Suuna", "dob": "", "school_pay_code": "" },
    { "name": "Eliana Nazziwa", "dob": "", "school_pay_code": "" },
    { "name": "Khwezi Telma Kalenge", "dob": "", "school_pay_code": "" },
    { "name": "Kibuuka King Kylian", "dob": "", "school_pay_code": "" },
    { "name": "Nagawa Gabrielle", "dob": "", "school_pay_code": "" },
    { "name": "Kawule Josiah Joash", "dob": "", "school_pay_code": "" },
    { "name": "Mutebi Jabari", "dob": "", "school_pay_code": "" },
    { "name": "Masembe John D", "dob": "", "school_pay_code": "" },
    { "name": "Ssenyonga Ayman Sufian", "dob": "", "school_pay_code": "" },
    { "name": "Nalujja Hashmat", "dob": "", "school_pay_code": "" },
    { "name": "Wavamuno Gordon Godfrey Aaron", "dob": "", "school_pay_code": "" },
    { "name": "Kawooya Aleeza", "dob": "", "school_pay_code": "" },
    { "name": "Nyanzi Priam Banks", "dob": "", "school_pay_code": "" },
    { "name": "Nsozzi Ariana Ivy Williams", "dob": "", "school_pay_code": "" },
    { "name": "Kaweesa Ezekiel", "dob": "", "school_pay_code": "" },
    { "name": "Muhoozi Liam Avram", "dob": "", "school_pay_code": "" },
    { "name": "Kisakye Angel Kizito", "dob": "", "school_pay_code": "" },
    { "name": "Nansamba Ariana", "dob": "", "school_pay_code": "" },
    { "name": "Wogisha Leo Abel", "dob": "", "school_pay_code": "" },
    { "name": "Natania Rose Mary Namujjuzi", "dob": "", "school_pay_code": "" },
    { "name": "Nankanja Myra Happy", "dob": "", "school_pay_code": "" },
    { "name": "Ahmed Khyran", "dob": "", "school_pay_code": "" },
    { "name": "Nalugo Patience", "dob": "", "school_pay_code": "" },
    { "name": "Amara Lisa", "dob": "", "school_pay_code": "" },
    { "name": "Badebye Kingsley Rapha Mukisa", "dob": "", "school_pay_code": "" },
    { "name": "Wasswa Israel Kirabo Nadduli", "dob": "", "school_pay_code": "" },
    { "name": "Bbaale Eleazar Prominent", "dob": "", "school_pay_code": "" },
    { "name": "Akilimali David Jahleel", "dob": "", "school_pay_code": "" },
    { "name": "Tariq Kayiwa", "dob": "", "school_pay_code": "" },
    { "name": "Adrian Mukuye", "dob": "", "school_pay_code": "" },
    { "name": "Ineza Margaret Hellena", "dob": "", "school_pay_code": "" },
    { "name": "Suubi Favour Nkalubo", "dob": "", "school_pay_code": "" },
    { "name": "Seth Ggolooba M", "dob": "", "school_pay_code": "" }
  ],
  "PRE_PRIMARY_CLASS_ANGELONIA": [
    { "name": "Akram Matovu", "dob": "", "school_pay_code": "" },
    { "name": "Jjingo Travis", "dob": "", "school_pay_code": "" },
    { "name": "Kitiibwa Joachim", "dob": "", "school_pay_code": "" },
    { "name": "Besigye Ryan", "dob": "", "school_pay_code": "" },
    { "name": "Makayla Abigail Nalukaaga", "dob": "", "school_pay_code": "" },
    { "name": "Ivana Tabitha Manzi", "dob": "", "school_pay_code": "" },
    { "name": "Benjamin Henson", "dob": "", "school_pay_code": "" },
    { "name": "Nabatanzi Ariana", "dob": "", "school_pay_code": "" },
    { "name": "Karungi Isabella", "dob": "", "school_pay_code": "" },
    { "name": "Ssemujju Precious", "dob": "", "school_pay_code": "" },
    { "name": "Wasswa Aaron", "dob": "", "school_pay_code": "" },
    { "name": "Tariq Mukiibi", "dob": "", "school_pay_code": "" },
    { "name": "Amanya Nathaniel Magash", "dob": "", "school_pay_code": "" },
    { "name": "Nsubuga Macsen", "dob": "", "school_pay_code": "" },
    { "name": "Lugendo Prosper", "dob": "", "school_pay_code": "" },
    { "name": "Kayongo Jahsim", "dob": "", "school_pay_code": "" },
    { "name": "Mugoya Timothy", "dob": "", "school_pay_code": "" },
    { "name": "Ssemwezi James", "dob": "", "school_pay_code": "" },
    { "name": "Ashley Liam Cole Kalyowa", "dob": "", "school_pay_code": "" },
    { "name": "Mayanja Shayan", "dob": "", "school_pay_code": "" },
    { "name": "Lemuel Gatali", "dob": "", "school_pay_code": "" },
    { "name": "Nakyanzi Daphine", "dob": "", "school_pay_code": "" },
    { "name": "Ssekitto Declan", "dob": "", "school_pay_code": "" },
    { "name": "Matovu Tamia", "dob": "", "school_pay_code": "" },
    { "name": "Carlton Ssuna", "dob": "", "school_pay_code": "" },
    { "name": "Whitley Gemma", "dob": "", "school_pay_code": "" },
    { "name": "Alia Katasi Mwiza", "dob": "", "school_pay_code": "" },
    { "name": "Victoria Tibagwa", "dob": "", "school_pay_code": "" },
    { "name": "Kivumbi Philemon Genius", "dob": "", "school_pay_code": "" },
    { "name": "Troy Ssuuna Desmet", "dob": "", "school_pay_code": "" },
    { "name": "Amanya Nathaniel", "dob": "", "school_pay_code": "" },
    { "name": "Darius Mayende", "dob": "", "school_pay_code": "" }
  ],
  "HEADSTART_CLASS_SPOONBILLS": [
    { "name": "Malaika Genza Gabriella", "dob": "", "school_pay_code": "" },
    { "name": "Katamba Adeel Ihsaan", "dob": "", "school_pay_code": "" },
    { "name": "Namuddu Amaal", "dob": "", "school_pay_code": "" },
    { "name": "Nyanja Arthur Kezimbira", "dob": "", "school_pay_code": "" },
    { "name": "Namuyanja Petralina Aretha", "dob": "", "school_pay_code": "" },
    { "name": "Muleme Jessica Ruth", "dob": "", "school_pay_code": "" },
    { "name": "Kaziro Seth Preston", "dob": "", "school_pay_code": "" },
    { "name": "Nakazziwa Ariana Winslet", "dob": "", "school_pay_code": "" },
    { "name": "Lukyamuzi Afreen Mukisa", "dob": "", "school_pay_code": "" },
    { "name": "Jamba John Mukisa", "dob": "", "school_pay_code": "" },
    { "name": "Manzi Farhan Danish", "dob": "", "school_pay_code": "" },
    { "name": "Asasira Hannah Rihanna", "dob": "", "school_pay_code": "" },
    { "name": "Kyamagero Elijah Joshua", "dob": "", "school_pay_code": "" },
    { "name": "Ssekitto Dasia Ruth Chen Mubeezi", "dob": "", "school_pay_code": "" },
    { "name": "Ainomugisha Xavier", "dob": "", "school_pay_code": "" },
    { "name": "Mwesigye Aviel Elai", "dob": "", "school_pay_code": "" },
    { "name": "Kajagu Tivan Rafael", "dob": "", "school_pay_code": "" },
    { "name": "Ssenyonga Hanan", "dob": "", "school_pay_code": "" },
    { "name": "Ntume Husnah Eshal", "dob": "", "school_pay_code": "" },
    { "name": "Ssali Ramah", "dob": "", "school_pay_code": "" },
    { "name": "Kwikiriza Adeline Gloria", "dob": "", "school_pay_code": "" },
    { "name": "Nakibuule Tatiana Elsie", "dob": "", "school_pay_code": "" },
    { "name": "Kagimu Pyden George William", "dob": "", "school_pay_code": "" },
    { "name": "Kabira Mark Travis", "dob": "", "school_pay_code": "" },
    { "name": "Mpindi James Elisha", "dob": "", "school_pay_code": "" },
    { "name": "Mugerwa Amanee Yara", "dob": "", "school_pay_code": "" },
    { "name": "Katongole Mighty Midas", "dob": "", "school_pay_code": "" },
    { "name": "Mulowoza Monica Makanga", "dob": "", "school_pay_code": "" },
    { "name": "Aurora Mulungi", "dob": "", "school_pay_code": "" },
    { "name": "Nanfuka Jacinta", "dob": "", "school_pay_code": "" }
  ],
  "RECEPTION_CLASS": [
    { "name": "Namuli Mirabel Prosper", "dob": "", "school_pay_code": "" },
    { "name": "Namuyanja Vince Mirella", "dob": "", "school_pay_code": "" },
    { "name": "Sseruyange Jayce", "dob": "", "school_pay_code": "" },
    { "name": "Masika Precious Mayani", "dob": "", "school_pay_code": "" },
    { "name": "Kasule Idris Mukasa", "dob": "", "school_pay_code": "" },
    { "name": "Kwagala Engel Kizito", "dob": "", "school_pay_code": "" },
    { "name": "Herielle Williams Mponye", "dob": "", "school_pay_code": "" },
    { "name": "Gumisiriza Daystar", "dob": "", "school_pay_code": "" },
    { "name": "Rwashana Abigail", "dob": "", "school_pay_code": "" },
    { "name": "Muzaana Makula", "dob": "", "school_pay_code": "" },
    { "name": "Ssempijja Michelle", "dob": "", "school_pay_code": "" }
  ],
  "BEGINNER_CLASS_ORCHIDS": [
    { "name": "Nsubuga Elon", "dob": "", "school_pay_code": "" },
    { "name": "Kasisa Tahir", "dob": "", "school_pay_code": "" },
    { "name": "Katumba Amir Suhail", "dob": "", "school_pay_code": "" },
    { "name": "Kalyowa Angello Jayden", "dob": "", "school_pay_code": "" },
    { "name": "Kato Isaac Kwagala", "dob": "", "school_pay_code": "" },
    { "name": "Magalu Farhan Fazil", "dob": "", "school_pay_code": "" },
    { "name": "Kigoye Jerome Josiah", "dob": "", "school_pay_code": "" },
    { "name": "Akatuhabwa Kyzer", "dob": "", "school_pay_code": "" },
    { "name": "Kivumbi Jayce Daniel", "dob": "", "school_pay_code": "" },
    { "name": "Omara Trevine Testimony", "dob": "", "school_pay_code": "" },
    { "name": "Lubowa Arnold", "dob": "", "school_pay_code": "" },
    { "name": "Mutyaba Ayman", "dob": "", "school_pay_code": "" },
    { "name": "Wasajja Jaythan", "dob": "", "school_pay_code": "" },
    { "name": "Ssesanga Ayan", "dob": "", "school_pay_code": "" },
    { "name": "Akantorana Destiny", "dob": "", "school_pay_code": "" },
    { "name": "Kyazze Marias Myles", "dob": "", "school_pay_code": "" },
    { "name": "Mayanja Nahiah", "dob": "", "school_pay_code": "" },
    { "name": "Muhindo Audrey Miranda", "dob": "", "school_pay_code": "" },
    { "name": "Ntabadde Hazel Nankya", "dob": "", "school_pay_code": "" },
    { "name": "Nassuna Adel", "dob": "", "school_pay_code": "" },
    { "name": "Birungi Kyna", "dob": "", "school_pay_code": "" },
    { "name": "Kirungi Queen Ivy", "dob": "", "school_pay_code": "" },
    { "name": "Namugenyi Jamie Jombwe", "dob": "", "school_pay_code": "" },
    { "name": "Nakalule Sarah", "dob": "", "school_pay_code": "" },
    { "name": "Trizah Aleng Kristian", "dob": "", "school_pay_code": "" },
    { "name": "Itungo Dapherah", "dob": "", "school_pay_code": "" },
    { "name": "Nanyunja Zaabu Margret", "dob": "", "school_pay_code": "" },
    { "name": "Nantongo Wendy Arielle", "dob": "", "school_pay_code": "" },
    { "name": "Katongole Ramah", "dob": "", "school_pay_code": "" }
  ],
  "HEADSTART_CLASS_MARIGOLD": [
    { "name": "Amone Lucas", "dob": "", "school_pay_code": "" },
    { "name": "Nassazi Maria", "dob": "", "school_pay_code": "" },
    { "name": "Walugembe Isabella", "dob": "", "school_pay_code": "" },
    { "name": "Ssemwogerere Joram Nehemiah", "dob": "", "school_pay_code": "" },
    { "name": "Ssekajugo Jayrus Maurice", "dob": "", "school_pay_code": "" },
    { "name": "Kasozi Testimony Hosea Fabian", "dob": "", "school_pay_code": "" },
    { "name": "Nuwasiima Sheena", "dob": "", "school_pay_code": "" },
    { "name": "Gimbo Elisheba", "dob": "", "school_pay_code": "" },
    { "name": "Nakiganda Philberta", "dob": "", "school_pay_code": "" },
    { "name": "Hirah Tarah Nalwoga", "dob": "", "school_pay_code": "" },
    { "name": "Khalid Lukwago", "dob": "", "school_pay_code": "" },
    { "name": "Ishan Adam", "dob": "", "school_pay_code": "" },
    { "name": "Kyabagye Esther", "dob": "", "school_pay_code": "" },
    { "name": "Nassali Ashley", "dob": "", "school_pay_code": "" },
    { "name": "Muwanguzi Harmony Lily", "dob": "", "school_pay_code": "" }
  ]
};

// Transform data into the required interface
interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  grade: string;
  avatar: string;
  status: 'active' | 'inactive' | 'suspended';
  admissionDate: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  fees: {
    totalAmount: number;
    paidAmount: number;
    balance: number;
    lastPaymentDate?: string;
  };
  schoolPayCode: string;
}

// Generate students from the class data
const localStudentDatabase: Student[] = [];

Object.entries(studentsByClass).forEach(([className, students]) => {
  students.forEach((student, index) => {
    const photoFilename = getPhotoFilename(student.name);
    const avatar = photoFilename ? getAvatarWithFallback(photoFilename) : defaultAvatar;
    
    // Generate a deterministic gender based on name patterns
    const femaleIndicators = ['a$', 'ia$', 'na$', 'ya$', 'ah$', 'ella$', 'iah$', 'Grace', 'Faith', 'Hope', 'Mercy', 'Joy'];
    const isFemale = femaleIndicators.some(pattern => {
      if (pattern.includes('$')) {
        return new RegExp(pattern).test(student.name.toLowerCase());
      }
      return student.name.toLowerCase().includes(pattern.toLowerCase());
    });
    
    const studentId = `${className}_${index + 1}`;
    
    const transformedStudent: Student = {
      id: studentId,
      name: student.name,
      email: `${student.name.toLowerCase().replace(/\s+/g, '.')}@student.risingstar.edu`,
      phone: `+256${Math.floor(700000000 + Math.random() * 99999999)}`,
      class: className,
      grade: className.includes('JUNIOR') ? className.replace('_', ' ') : 
             className.includes('PRE_PRIMARY') ? 'Pre-Primary' :
             className.includes('HEADSTART') ? 'Headstart' :
             className.includes('BEGINNER') ? 'Beginner' :
             className.includes('RECEPTION') ? 'Reception' : className,
      avatar,
      status: 'active' as const,
      admissionDate: `2024-0${Math.floor(Math.random() * 9) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      guardianName: `${student.name.split(' ')[0]} Parent`,
      guardianPhone: `+256${Math.floor(700000000 + Math.random() * 99999999)}`,
      address: `Plot ${Math.floor(Math.random() * 999) + 1}, ${['Kampala', 'Entebbe', 'Mukono', 'Wakiso'][Math.floor(Math.random() * 4)]}`,
      dateOfBirth: student.dob || `${Math.floor(Math.random() * 28) + 1}.${Math.floor(Math.random() * 12) + 1}.${2010 + Math.floor(Math.random() * 10)}`,
      gender: isFemale ? 'female' : 'male',
      fees: {
        totalAmount: 1500000,
        paidAmount: Math.floor(Math.random() * 1500000),
        balance: 0,
        lastPaymentDate: `2024-0${Math.floor(Math.random() * 9) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
      },
      schoolPayCode: student.school_pay_code || `100${Math.floor(Math.random() * 9999999)}`
    };
    
    // Calculate balance
    transformedStudent.fees.balance = transformedStudent.fees.totalAmount - transformedStudent.fees.paidAmount;
    
    localStudentDatabase.push(transformedStudent);
  });
});

export { localStudentDatabase, studentsByClass };
export type { Student };