// =========================================================
// FACULTY WALL DATA
// =========================================================
// Names and photos pulled from the CSE Department faculty page:
// https://bvrithyderabad.edu.in/computer-science-and-engineering/faculty/
//
// Per request, designation and subject/area were left blank (FacultyWall
// hides those lines automatically when empty). Each entry also carries a
// curated one-line message — this is the italic quote shown on the
// Faculty Wall card back and on the Final Gift card. Feel free to swap any
// of these out for a real, specific student memory whenever you have one.
//
// NOTE ON PHOTOS: these `photo` values point directly at the images hosted
// on bvrithyderabad.edu.in (this sandbox can only reach package registries,
// not arbitrary websites, so the files couldn't be downloaded locally). If
// you'd rather self-host them, download the images into public/faculty/
// and change the matching `photo` value to e.g. "/faculty/aruna-rao.jpg".
// =========================================================

const RAW = [
  ['Dr. KVN Sunitha', 'https://media.licdn.com/dms/image/v2/D5603AQFENqUMtLhS6Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718287542780?e=2147483647&v=beta&t=aVSxEsIFX8x2bH70w05B5dKNyQIJBXbLElKy8KrXn4c', 'Led with grace, and always found time to actually listen.'],  
  ['Dr. A. Sharada', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/07/Principal1.jpg', 'Led with grace, and always found time to actually listen.'],  
  ['Dr. Aruna Rao S L', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/07/DrArunaRaoSL_HoD_CSE.jpg', 'The kind of guidance that quietly shapes an entire department.'],
  ['Ms. Swapna D', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/swapna-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Turned late assignments into lessons, not lectures.'],
  ['Dr. R. Suneetha Rani', 'https://bvrithyderabad.edu.in/wp-content/uploads/2024/08/DrSuneethaRani.jpg', 'Explained the hardest topics like they were the easiest.'],
  ['Dr. M. Shanmuga Sundari', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/shanmuga-sundari-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Never let a confused face in class go unnoticed.'],
  ['Ms. S. Rama Devi', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/rama-devi-it-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Patient enough to answer the same doubt three different ways.'],
  ['Dr. Ganti Naga Satish', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/nagasatish-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Made networks less about cables and more about curiosity.'],
  ['Mr. M. Dyva Sugnana Rao', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/suganana-rao-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Made office hours feel far less intimidating than they should have.'],
  ['Dr. K. Kanaka Vardhini', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/07/KanakaVardhini.jpg', 'Believed in us on the days we didn\u2019t believe in ourselves.'],
  ['Dr. C. Nagaraju', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/nagaraju-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Somehow always knew who hadn\u2019t studied \u2014 and taught anyway.'],
  ['Dr. Vidhyullatha Sukhavasi', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/vidyulatha-tyagi-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Made complex theory feel like a story worth following.'],
  ['Dr. C. Rajeev', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/07/Raeev.jpg', 'The professor who actually remembered our questions from last week.'],
  ['Dr. G. Monika Rani', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/12/monika.png', 'Brought calm into every panicked pre-exam doubt session.'],
  ['Mr. Chintala Anil Kumar', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/anil-it-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Turned \u201cI don\u2019t get it\u201d into \u201coh, that makes sense now.\u201d'],
  ['Mr. N. Raghava Rao', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/06/RaghavaRao.jpg', 'Taught us to debug our code, and our excuses.'],
  ['Ms. K. B. K. S. Durga', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/durga-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Made sure no question ever felt too small to ask.'],
  ['Ms. Budati Nagaveni', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/nagaveni-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Explained things twice before we even had to ask.'],
  ['Mr. Rajesh Kandakatla', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/rajesh-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Made a hard subject feel like a fair fight.'],
  ['Mr. Naresh Koenni', 'https://bvrithyderabad.edu.in/wp-content/uploads/2024/09/MrKNaresh.jpg', 'Always had one more example ready when the first didn\u2019t land.'],
  ['Ms. Rama Devi Gunnam', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/07/RamaDevi.jpg', 'Graded fairly, taught kindly, remembered everyone.'],
  ['Mr. K. Bhargav Ram', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/bhargav-ram-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Made Monday morning classes surprisingly bearable.'],
  ['Mr. Naga Sriharsha Mulugu', 'https://bvrithyderabad.edu.in/wp-content/uploads/2024/09/NagaSriHarsha.jpg', 'The rare professor who made mistakes feel like progress.'],
  ['Ms. Dharmapuri Sangeetha', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/sangeetha-it-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Every doubt got an answer, no matter how basic it seemed.'],
  ['Ms. T. Durga Devi', 'https://bvrithyderabad.edu.in/wp-content/uploads/2024/08/MsDurgaDevi.jpg', 'Taught with a patience that never once ran out.'],
  ['Ms. Padmavati E Gundgurti', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/sunitha-cse-faculty-bvrit-hyderabad-engineering-women-college-1.png', 'Made sure the quiet students got heard too.'],
  ['Ms. Suparna Das', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/suparna-das-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Turned dry theory into something we actually remembered.'],
  ['Ms. V. Manya', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/manya-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Always made time, even five minutes before the bell.'],
  ['Ms. K. Neha', 'https://bvrithyderabad.edu.in/wp-content/uploads/2024/09/MsNeha.jpg', 'Explained it once more, every single time, without sighing.'],
  ['Ms. M. Sandhya Vani', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/01/SandhyaVani.jpg', 'Made us feel capable of more than we thought.'],
  ['Ms. Vineela K', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/vineela-it-faculty-bvrit-hyderabad-engineering-women-college.webp', 'The calm in the room during every stressful deadline.'],
  ['Ms. Vemuri Aneesha', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/01/Aneesha.jpg', 'Made feedback feel like encouragement, not criticism.'],
  ['Ms. Mugala Srisevitha', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/07/Srisevitha.jpg', 'Somehow made 8 AM classes feel worth waking up for.'],
  ['Ms. Mynapati Lakshmi Prasudha', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/07/lakshmi-prasudha-cse-faculty-bvrit-hyderabad-engineering-women-college.jpg', 'Believed effort mattered just as much as the answer.'],
  ['Ms. B. Pushpa', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/06/Pushpa.jpg', 'Made sure everyone left class understanding, not just attending.'],
  ['Ms. Yeluri Divya', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/divya-cse-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Turned confusion into confidence, one doubt at a time.'],
  ['Ms. Goguri Rashmitha', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/04/Rashmitha.jpg', 'Made even the toughest deadlines feel manageable.'],
  ['Ms. G. Chandana Priya', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/06/chandanapriya.jpg', 'Noticed when we were struggling before we ever said so.'],
  ['Ms. T. Jhansi Renuka', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/02/JHANSI-RENUKA.jpg', 'Taught us to think it through, not just memorize it.'],
  ['Ms. P. Surya Bharati', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/01/MsSuryabharathi.jpg', 'Made sure \u201cany doubts?\u201d was never a rhetorical question.'],
  ['Ms. Mukku Sahaja', 'https://bvrithyderabad.edu.in/wp-content/uploads/2025/01/MsSahaja.jpg', 'Explained with a patience that made giving up feel unnecessary.'],
  ['Dr. R Sarath Babu', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/09/DrSarath.jpg', 'Made research sound less scary and a lot more exciting.'],
  ['Ms. Ch Shravani', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/06/ChSravani.jpg', 'Kept classes light even when the syllabus wasn\u2019t.'],
  ['Ms. J. Jhansi Goud', 'https://bvrithyderabad.edu.in/wp-content/uploads/2024/08/Ms-J.-Jhansi-Goud.jpg', 'Made sure we understood the \u201cwhy,\u201d not just the \u201chow.\u201d'],
  ['Ms. Mounika Chakana', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/06/Ms.-Mounika-Chakana.jpg', 'Answered every doubt like it mattered \u2014 because it did.'],
  ['Dr. V Bhaskara Murthy', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/06/BhaskaraMurthy.jpg', 'Brought decades of knowledge and zero intimidation.'],
  ['Ms. Tamma Keerthana', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/07/Keerthana.jpg', 'New to teaching, but never new to caring.'],
  ['Ms. Mugala Divya', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/06/MDivya.jpg', 'Made the first few overwhelming weeks feel a little less so.'],
  ['Ms. S. Swapna', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/07/SSwapna.jpg', 'Taught with a warmth that made mistakes feel safe to make.'],
  ['Mr. Shaik Mabasha', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/07/Mabasha.jpg', 'Made sure the quiet corners of the classroom got noticed too.'],
  ['Ms. Patlolla Sruthi', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/05/SruthiAIML.jpg', 'Explained AI concepts like they weren\u2019t rocket science.'],
  ['Ms. Manda Prameela Satyavathi', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/07/Prameela.jpg', 'Made sure every doubt got answered before the bell rang.'],
  ['Dr. Gotlur Kalpana', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/07/Kalpana.jpg', 'Brought clarity to concepts that used to feel like a blur.'],
  ['Dr. Rashi Saxena', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/08/Rashi.jpg', 'Made us curious about a subject we didn\u2019t expect to enjoy.'],
  ['Ms. Kolli Lalitha Kumari', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/09/LalithaKumari.jpg', 'Taught patiently, graded fairly, cared genuinely.'],
  ['Ms. Ch. Lalitha Bala', 'https://bvrithyderabad.edu.in/wp-content/uploads/2023/06/lalitha-it-faculty-bvrit-hyderabad-engineering-women-college.webp', 'Made sure no one ever left with a doubt unanswered.'],
  ['Ms. R. Priyanka', 'https://bvrithyderabad.edu.in/wp-content/uploads/2026/09/Priyanka.jpg', 'The professor who made new topics feel a little less scary.'],
]

const ACCENTS = ['coral', 'lavender', 'mint', 'sky', 'sun', 'pink']

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const facultyMembers = RAW.map(([name, photo, memory], i) => ({
  id: slugify(name),
  name,
  designation: '',
  subject: '',
  memory,
  photo,
  accent: ACCENTS[i % ACCENTS.length],
}))