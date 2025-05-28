"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Trophy, Medal, Youtube, HelpCircle } from "lucide-react"
import CounterAnimation from "@/components/counter-animation"
import PixelBackground from "@/components/pixel-background"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Card as DashboardCard,
  CardContent as DashboardCardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ContestTracker from "@/components/contest-tracker"
import YouTubeCarousel from "@/components/youtube-carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import BlogPostCarousel from "@/components/blog-post-carousel"
import { useTheme } from "next-themes"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15] dark:border-white/[0.15] border-black/[0.05] light:border-black/[0.05]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] light:shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] dark:after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] light:after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function HeroGeometric() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  const platforms = [
    {
      name: "Codeforces",
      url: "https://codeforces.com",
      color: "from-purple-500/80 to-blue-500/80",
      level: "Intermediate to Advanced",
      description: "Competitive Programming Contests and Problem Archive.",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com",
      color: "from-yellow-500/80 to-orange-500/80",
      level: "Beginner to Advanced",
      description: "Coding Interview Preparation and Contests.",
    },
    {
      name: "HackerRank",
      url: "https://hackerrank.com",
      color: "from-green-500/80 to-emerald-500/80",
      level: "Beginner Friendly",
      description: "Coding Challenges and Skill Certification.",
    },
    {
      name: "CodeChef",
      url: "https://codechef.com",
      color: "from-red-500/80 to-rose-500/80",
      level: "Beginner to Intermediate",
      description: "Competitive Programming and Monthly Contests.",
    },
    {
      name: "GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/competitive-programming-a-complete-guide/",
      color: "from-green-500/80 to-emerald-500/80",
      level: "Beginner Friendly",
      description: "Pre-Preps before Jumping on LeetCode.",
    },
  ]

  const topCoders = [
    { rank: 1, name: "Krishna Agarwal", branch: "Computer Science", score: 2850, badge: "Grandmaster" },
    { rank: 2, name: "Arnav Tripathi", branch: "Computer and Communication", score: 2720, badge: "Master" },
    { rank: 3, name: "Krishna Anand", branch: "Computer and Communication", score: 2680, badge: "Master" },
    { rank: 4, name: "Ritanshu Kumar", branch: "Computer Science", score: 2590, badge: "Expert" },
    { rank: 5, name: "Devadathan", branch: "Computer Science", score: 2510, badge: "Expert" },
    { rank: 6, name: "Sumanth Kamath", branch: "Maths and Computing", score: 2470, badge: "Expert" },
    { rank: 7, name: "Mrinal Kumar", branch: "Mechatronics", score: 2350, badge: "Specialist" },
    { rank: 8, name: "Ritesh Gupta", branch: "Computer Science", score: 2290, badge: "Specialist" },
    { rank: 9, name: "Kritagaya Singh", branch: "Electrical and Electronics", score: 2180, badge: "Specialist" },
    { rank: 10, name: "Manas Tewari", branch: "Mechatronics", score: 2120, badge: "Specialist" },
  ]

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Grandmaster":
        return "bg-red-500 hover:bg-red-600"
      case "Master":
        return "bg-orange-500 hover:bg-orange-600"
      case "Expert":
        return "bg-purple-500 hover:bg-purple-600"
      case "Specialist":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/blue-abstract-bg.jpeg')",
        }}
      />

      {/* Overlay for better text readability */}
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40" />

      <div className="relative z-10 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-white/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />

          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-blue-400/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />

          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-purple-400/[0.15]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />

          <ElegantShape
            delay={0.6}
            width={200}
            height={60}
            rotate={20}
            gradient="from-cyan-400/[0.15]"
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          />

          <ElegantShape
            delay={0.7}
            width={150}
            height={40}
            rotate={-25}
            gradient="from-indigo-400/[0.15]"
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          />
        </div>

        {/* Home Section */}
        <section id="home" className="relative z-10 pt-20 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 md:mb-12"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                  CP
                </div>
                <span className="text-sm text-white/90 tracking-wide">CodeCraft.</span>
              </motion.div>

              <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                    MIT Manipal's
                  </span>
                  <br />
                  <span
                    className={cn(
                      "bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300",
                      pacifico.className,
                    )}
                  >
                    Programming Community
                  </span>
                </h1>
              </motion.div>

              <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
                  practice and compete with your peers and prepare for contests, interviews and ace them all with the
                  help of this Programmers Community.
                </p>
              </motion.div>

              <motion.div
                custom={3}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-8"
              >
                <Link href="https://chat.whatsapp.com/IFS5Yq0SOI9C7P6bDbHzoK" target="_blank" rel="noopener noreferrer">
                  <Button className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 backdrop-blur-sm border border-white/20 min-h-[48px]">
                    Join the WhatsApp Group
                  </Button>
                </Link>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 mt-6 sm:mt-4">
                  <CounterAnimation end={2500} label="Total Students at MIT Manipal" />
                  <CounterAnimation end={120} label="Active Competitive Coders" duration={2.5} />
                  <CounterAnimation end={50} label="Average Weekly Contests Submissions" duration={3} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* YouTube Videos Section */}
        <section id="videos" className="relative z-10 py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Youtube className="h-5 w-5 text-red-400" />
                  <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                    Learning Resources
                  </h2>
                </div>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Videos to Help you Get Started with Competitive Programming
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <YouTubeCarousel />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blogs and Posts Section */}
        <section id="blogs" className="relative z-10 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ExternalLink className="h-5 w-5 text-orange-400" />
                  <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-amber-300">
                    Blogs & Posts
                  </h2>
                </div>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Articles and Posts to Improve your Competitive Programming Skills
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <BlogPostCarousel />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CP Platforms Section */}
        <section id="platforms" className="relative z-10 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-8 sm:mb-12"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                  Competitive Programming Platforms
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base px-4">
                  Explore these Platforms to Enhance your Problem-Solving Skills and Participate in Contests Worldwide.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {platforms.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={platform.url} target="_blank" rel="noopener noreferrer">
                      <Card className="overflow-hidden h-full min-h-[200px] border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15">
                        <CardContent className="p-0 h-full relative">
                          <div className="h-full w-full p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden min-h-[200px]">
                            {/* Glassmorphism overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                            {/* Animated background particles */}
                            <PixelBackground
                              color="rgba(255,255,255,0.1)"
                              density={8}
                              className="pointer-events-none opacity-50"
                            />

                            <div className="flex justify-between items-start relative z-10">
                              <h3 className="text-xl font-bold text-white drop-shadow-lg">{platform.name}</h3>
                              <ExternalLink className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                            </div>

                            <div className="mt-3 sm:mt-4 mb-2 relative z-10">
                              <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white border border-white/30 shadow-lg">
                                {platform.level}
                              </span>
                            </div>

                            <div className="mt-auto relative z-10">
                              <div className="text-xs sm:text-sm text-white/90 drop-shadow-sm leading-relaxed">
                                {platform.description}
                              </div>
                              <div className="mt-2 sm:mt-3 h-0.5 w-0 bg-gradient-to-r from-white/50 to-white/30 group-hover:w-full transition-all duration-500 shadow-sm"></div>
                            </div>

                            {/* Subtle glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contest Tracker Section */}
        <section id="contests" className="relative z-10 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                  Contest Tracker
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Stay updated with Upcoming and Past Contests from Various Competitive Programming Platforms.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <ContestTracker />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section id="leaderboard" className="relative z-10 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                  Top Coders Leaderboard
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">MIT Manipal's Highest-Ranked Competitive Programmers.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="overflow-x-auto -mx-4 px-4"
              >
                <DashboardCard className="border-0 shadow-xl bg-white/10 backdrop-blur-md border border-white/20 min-w-[640px] sm:min-w-0">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-white">Top 10 Coders</CardTitle>
                        <CardDescription className="text-white/70">
                          Updated Weekly Based on Contest Performance
                        </CardDescription>
                      </div>
                      <Trophy className="h-6 w-6 text-yellow-400" />
                    </div>
                  </CardHeader>
                  <DashboardCardContent className="p-0">
                    <div className="relative overflow-x-auto rounded-b-lg">
                      <Table>
                        <TableHeader className="bg-white/5 backdrop-blur-sm">
                          <TableRow>
                            <TableHead className="w-16 text-white/80">Rank</TableHead>
                            <TableHead className="text-white/80">Name</TableHead>
                            <TableHead className="text-white/80 hidden md:table-cell">Branch</TableHead>
                            <TableHead className="text-white/80">Rating</TableHead>
                            <TableHead className="text-white/80 text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topCoders.map((coder) => (
                            <TableRow
                              key={coder.rank}
                              className={
                                coder.rank <= 3
                                  ? "bg-gradient-to-r from-white/10 to-transparent hover:bg-white/15 backdrop-blur-sm"
                                  : "hover:bg-white/10 backdrop-blur-sm"
                              }
                            >
                              <TableCell className="font-medium text-white">
                                <div className="flex items-center">
                                  {coder.rank <= 3 && (
                                    <Medal
                                      className={cn(
                                        "mr-1.5 h-4 w-4",
                                        coder.rank === 1
                                          ? "text-yellow-400"
                                          : coder.rank === 2
                                            ? "text-gray-300"
                                            : "text-amber-600",
                                      )}
                                    />
                                  )}
                                  {coder.rank}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium text-white">{coder.name}</TableCell>
                              <TableCell className="hidden md:table-cell text-white/80">{coder.branch}</TableCell>
                              <TableCell className="text-white">{coder.score}</TableCell>
                              <TableCell className="text-right">
                                <Badge className={cn("font-normal", getBadgeColor(coder.badge))}>{coder.badge}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </DashboardCardContent>
                </DashboardCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative z-10 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <HelpCircle className="h-5 w-5 text-cyan-400" />
                  <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Common Questions about Competitive Programming and Our Community
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl overflow-hidden"
              >
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-white/20 px-4">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left py-5 text-base sm:text-lg font-medium">
                      How do I get started with competitive programming?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80 pb-5 text-sm sm:text-base">
                      Start by learning a programming language like C++, Java, or Python. Then practice basic problems
                      on platforms like LeetCode or CodeChef. Join our WhatsApp community for guidance, and gradually
                      participate in contests to improve your skills.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-white/20 px-4">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left py-5 text-base sm:text-lg font-medium">
                      Which programming language is best for competitive programming?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80 pb-5 text-sm sm:text-base">
                      C++ is widely used due to its speed and STL library. However, Python is great for readability and
                      has powerful libraries. Java is also popular. Choose the language you're most comfortable with, as
                      algorithmic thinking matters more than the language itself.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-white/20 px-4">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left py-5 text-base sm:text-lg font-medium">
                      How often does the MIT Manipal community hold contests?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80 pb-5 text-sm sm:text-base">
                      We organize internal contests monthly and participate in external contests weekly. We also hold
                      special training sessions before major competitions like ICPC and Google Kickstart. Check our
                      contest tracker for upcoming events.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className="border-white/20 px-4">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left py-5 text-base sm:text-lg font-medium">
                      How can I improve my problem-solving speed?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80 pb-5 text-sm sm:text-base">
                      Regular practice is key. Start by understanding the problem thoroughly before coding. Learn
                      standard algorithms and data structures. Practice implementing them quickly. Participate in timed
                      contests to improve your speed under pressure. Review others' solutions after contests.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5" className="border-white/20 px-4">
                    <AccordionTrigger className="text-white hover:text-white/80 text-left py-5 text-base sm:text-lg font-medium">
                      How does competitive programming help with placements?
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80 pb-5 text-sm sm:text-base">
                      Competitive programming significantly improves your problem-solving skills, which is crucial for
                      technical interviews. Many companies like Google, Microsoft, and Amazon use coding challenges
                      similar to CP problems. It also demonstrates your passion for programming and ability to write
                      efficient code.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="relative z-10 py-8 sm:py-12 border-t border-white/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="space-y-4 col-span-2 md:col-span-1">
                <h3 className="text-xl font-bold text-white">CodeCraft.</h3>
                <p className="text-sm text-white/70">
                  MIT Manipal's Competitive Programming Community. Join Us to Enhance your Coding Skills and Prepare for
                  Contests and Interviews.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#home"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("home")
                      }}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#videos"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("videos")
                      }}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      Learning Resources
                    </a>
                  </li>
                  <li>
                    <a
                      href="#blogs"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("blogs")
                      }}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      Blogs & Posts
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#platforms"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("platforms")
                      }}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      CP Platforms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contests"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("contests")
                      }}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      Contest Tracker
                    </a>
                  </li>
                  <li>
                    <a
                      href="#leaderboard"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("leaderboard")
                      }}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      Leaderboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection("faq")
                      }}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 col-span-2 md:col-span-1">
                <h3 className="text-lg font-medium text-white">Contact</h3>
                <p className="text-sm text-white/70">Have Questions? Ask at:</p>
                <p className="text-sm text-white/70">Email: aayushmishra1105@gmail.com</p>
                <div className="pt-4 text-xs text-white/50">
                  <p>© {new Date().getFullYear()} CodeCraft.</p>
                  <p className="mt-1">Developed by Aayush Anil Mishra</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
