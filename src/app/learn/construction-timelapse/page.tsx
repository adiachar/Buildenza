import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Lock, Unlock, Zap, Lightbulb, CheckCircle, CodeSquare, AlertCircle } from "lucide-react"

const DummyContent = () => (
  <div className="blur-[8px] select-none opacity-40 pointer-events-none space-y-6 animate-pulse py-6 relative" aria-hidden="true">
    <div className="h-4 bg-gray-400 rounded w-full"></div>
    <div className="h-4 bg-gray-400 rounded w-11/12"></div>
    <div className="h-4 bg-gray-400 rounded w-4/5"></div>
    <div className="bg-gray-300/50 p-8 rounded-3xl border border-gray-200 h-48 w-full mt-8 flex flex-col gap-4">
      <div className="h-4 bg-gray-400 rounded w-1/2"></div>
      <div className="h-4 bg-gray-400 rounded w-1/3"></div>
      <div className="h-4 bg-gray-400 rounded w-2/3"></div>
    </div>
    <div className="h-4 bg-gray-400 rounded w-full mt-8"></div>
    <div className="h-4 bg-gray-400 rounded w-3/4"></div>
  </div>
)

export default async function ConstructionTimelapse() {
  const session = await getServerSession(authOptions)
  const isPremium = (session?.user as any)?.isPrime || false

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 text-gray-900 space-y-20 font-sans">

      {/* Header */}
      <div className="space-y-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest shadow-sm">
          <Zap className="w-3.5 h-3.5" /> Premium Masterclass
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-gray-900">
          AI Construction Timelapse Blueprint
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
          From initial concept to a viral-ready AI construction timelapse video. Learn the exact prompts top creators use.
        </p>
      </div>

      {/* Free Content Section */}
      <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
        {/* Decorative corner blur */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="space-y-8 relative z-10">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Stop Guessing. <br />Start Building.</h2>
          </div>

          <div className="space-y-6 text-lg md:text-xl text-gray-600 font-light leading-relaxed">
            <p>
              Creating AI build videos requires the right structure and precise prompting—something that takes weeks to figure out on your own through trial and error.
            </p>
            <p className="pl-6 border-l-4 border-blue-500 py-2">
              I’ve already done the hard part for you. Inside this masterclass, you gain access to the <strong>exact workflows and prompts</strong> that actually work.
            </p>
            <p className="font-medium text-gray-900 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              Just copy, apply, and start building faster—without the guesswork.
            </p>
          </div>
        </div>
      </div>

      {/* Premium Gated Section */}
      <div className={`rounded-[2rem] border ${isPremium ? 'border-green-200/50 bg-green-50/30' : 'border-gray-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]'} p-6 md:p-14 relative`}>

        {/* Unlock Gateway Banner */}
        {!isPremium && (
          <div className="mb-16 p-10 md:p-14 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 text-center shadow-2xl relative overflow-hidden group">
            {/* Grid layout background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="relative z-10 space-y-6">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
                <Lock className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Join Premium Access</h3>
              <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                Unlock the exact Master Prompts, formatting blueprints, and step-by-step upscaling techniques below. You are one click away.
              </p>
              <div className="pt-4">
                <Link href="/dashboard" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black hover:bg-gray-100 hover:scale-105 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Unlock Everything <Zap className="w-5 h-5 fill-black" />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-16 border-b border-gray-200 pb-8">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            {isPremium ? <Unlock className="w-6 h-6 text-green-600" /> : <Lock className="w-6 h-6 text-gray-400" />}
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Premium Curriculum</h2>
        </div>

        <div className="space-y-24">

          {/* Cinematic Frames */}
          <div className="space-y-8">
            <div className="space-y-2 mb-8">
              <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Module 02</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Generating Cinematic Frames</h2>
            </div>
            {isPremium ? (
              <div className="space-y-10 text-gray-700 leading-relaxed text-lg">
                <p className="text-xl">This module covers how to generate the 12–20 static image plates that form the foundation of your timelapse.</p>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3"><CheckCircle className="w-6 h-6 text-blue-500" /> Creating the "Hook"</h3>
                  <ul className="space-y-4 ml-9">
                    <li className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-gray-400 mt-2.5 shrink-0"></div>
                      <p>Your initial hook image must be in a Vertical 9:16 format and feature photorealistic, natural colors.</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4 mt-2 shadow-sm w-full">
                        <Lightbulb className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-blue-900 mb-1">Pro-Tip: Avoid Generation Drift</h4>
                          <p className="text-blue-800/80 text-base">Ensure the initial Hook has minimal trees and greenery, as foliage introduces high noise and causes the AI to drift off-model in later frames.</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3"><CheckCircle className="w-6 h-6 text-blue-500" /> The Clean Plate Strategy</h3>
                  <p className="ml-9">
                    Your frame generation prompts must dictate that no workers are visible in the images. Human involvement should only be implied through realistic dust, tool marks, material stacks, debris, and scaffolding.
                  </p>
                  <div className="ml-9 bg-gray-100 text-gray-600 p-4 rounded-xl text-sm italic font-medium">
                    Note: You will introduce the worker later during the video phase.
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3"><CheckCircle className="w-6 h-6 text-blue-500" /> Frame Prompt Structure</h3>
                  <div className="ml-9 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
                    <p className="font-bold text-gray-900 mb-2">Every frame prompt must include:</p>
                    <ul className="space-y-3">
                      <li><strong className="text-gray-900">Scene Lock:</strong> Camera height, fixed landmarks, and lighting.</li>
                      <li><strong className="text-gray-900">Stage Description:</strong> The current condition of the build.</li>
                      <li><strong className="text-gray-900">Construction Logic:</strong> Details like footprints, extension cords, and physically correct shadows.</li>
                    </ul>
                  </div>
                </div>

              </div>
            ) : <DummyContent />}
          </div>

          {/* Upscaling */}
          <div className="space-y-8">
            <div className="space-y-2 mb-8">
              <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Module 03</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Upscaling for Quality</h2>
            </div>
            {isPremium ? (
              <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
                <p>Using low-resolution images will ruin the timelapse illusion. Use the latest proven upscaling technique to force crisp realism.</p>

                <div className="ml-4 space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-6 rounded-2xl bg-white border border-gray-100 shadow-sm ml-4 md:ml-0 md:mx-4">
                      <span className="font-bold text-blue-600 block mb-1">Step 1</span>
                      Generate your image and upscale it to 2K within your flow tool.
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-6 rounded-2xl bg-white border border-gray-100 shadow-sm ml-4 md:ml-0 md:mx-4">
                      <span className="font-bold text-blue-600 block mb-1">Step 2</span>
                      Use this 2K upscaled version as the reference for your previous frame in the next generation.
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-6 rounded-2xl bg-white border border-gray-100 shadow-sm ml-4 md:ml-0 md:mx-4">
                      <span className="font-bold text-blue-600 block mb-1">Step 3</span>
                      Finally, upscale all these 2K images to 1x using Enhance.io to prepare them for the video generation phase.
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50/50 border border-orange-200 p-6 rounded-2xl flex gap-4 mt-8">
                  <AlertCircle className="w-6 h-6 text-orange-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-orange-900 mb-1">Troubleshooting</h4>
                    <p className="text-orange-900/80">If an image looks "off" after the flow upscale, download the 1K version instead and upscale it directly to 2K in Enhance.io.</p>
                  </div>
                </div>
              </div>
            ) : <DummyContent />}
          </div>

          {/* Video Generation */}
          <div className="space-y-8">
            <div className="space-y-2 mb-8">
              <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Module 04</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Video Animation Secrets</h2>
            </div>
            {isPremium ? (
              <div className="space-y-10 text-gray-700 text-lg leading-relaxed">
                <p className="text-xl">This is where you bring the static frames to life using Vio 3.1 fast.</p>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3"><CheckCircle className="w-6 h-6 text-blue-500" /> Introducing the Worker</h3>
                  <p className="ml-9">
                    Instead of struggling to keep characters consistent in static frames, introduce your worker directly during the Video generation phase using a timeline sequence.
                  </p>
                  <div className="ml-9 bg-gray-900 text-gray-300 p-5 rounded-2xl font-mono text-sm leading-relaxed border border-black shadow-lg">
                    <span className="text-gray-500 mb-2 block"># Example Worker Prompt:</span>
                    A worker wearing a yellow hardhat, black pants, boots, and gray t-shirt.
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3"><CheckCircle className="w-6 h-6 text-blue-500" /> The "Materialization" Hack</h3>
                  <p className="ml-9">
                    Having a worker carry materials often looks clunky, and material piles don't accurately decrease as they work. Instead, use the prompt: <strong className="text-gray-900 bg-gray-100 px-2 py-1 rounded">"A material smoothly materializes and appears in the hand"</strong>. You can speed up this scene during final editing so it looks like a seamless blur.
                  </p>
                </div>
              </div>
            ) : <DummyContent />}
          </div>

          {/* Packaging & SEO */}
          <div className="space-y-8">
            <div className="space-y-2 mb-8">
              <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Module 05</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Packaging, SEO, Uploading</h2>
            </div>
            {isPremium ? (
              <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
                <p>The final step is ensuring your high-quality video reaches an audience organically.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Editing Specs</h3>
                    <p className="text-base text-gray-600">Export at 720p resolution or higher, feature a smooth seamless loop, and start with high visual curiosity.</p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Keyword Rules</h3>
                    <p className="text-base text-gray-600">Do not stuff tags. Pick 5-8 highly relevant keywords. Always include 1-2 priority high-volume keywords.</p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Publishing Logic</h3>
                    <p className="text-base text-gray-600">Put your single best keyword directly in the video title. Ex: <em>"Abandoned House → Luxury Villa | Timelapse"</em>.</p>
                  </div>
                </div>
              </div>
            ) : <DummyContent />}
          </div>

          {/* Prompts and Format */}
          <div className="space-y-8">
            <div className="space-y-2 mb-8">
              <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Module 06</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Master Prompt Vault</h2>
            </div>
            {isPremium ? (
              <div className="space-y-12">

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><CodeSquare className="w-6 h-6 text-indigo-500" /> Frame Generation Protocol</h3>
                  <div className="bg-[#0f0f11] text-gray-300 p-6 md:p-10 rounded-3xl font-mono text-sm leading-relaxed whitespace-pre-wrap border border-gray-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                    <div className="absolute top-4 right-6 text-xs text-gray-600 uppercase font-sans tracking-widest font-bold select-none cursor-default">Copy</div>
                    {`You are a pro AI construction workflow engineer, and a cinematic storyboard director. The goal is to design physically realistic AI transformation timelapse sequences using:
• Clean construction stage plates (no workers visible)
• Real-world construction sequencing
• Camera and geometry continuity lock
• Viral-ready visual clarity
These images will be used as transformation plates for video generation between stages.

🎥 Global Continuity Rules (Non-Negotiable)
• Static tripod camera in identical position for the hook and ALL 12–20 stages.
• Same lens feel (choose: wide 24–28mm OR natural 35–50mm as per user needs).
• Same framing and geometry on all stages.
• Same visible landmarks.
• No teleporting objects.
• No snapping into place.
• No structural reinterpretation between stages
• No workers visible in any generated image
• Human involvement implied only through physical evidence (dust, tool marks, material stacks, debris, scaffolding, footprints)
• Realistic physics, shadows, dust, debris, and tool marks.
• No text, logos, or watermarks.

🧠 Core Philosophy Behind the Prompt
The transformation works because it enforces:
• Camera continuity lock
• Geometry continuity lock
• Modify only areas logically under construction
• Reflect realistic manpower capability
• Follow correct real-world build order
• Look physically achievable within the implied work period
No magical jumps. No AI reinterpretations.

📐 Intent & Scale Interpretation (Mandatory)
Before generating the initial HOOK image, infer the real-world scale, spatial dimensions, and human usability of the intended final build based on the user's description.
• If the build is described as a room, bunker, shelter, workspace, kitchen, or living space, it must be large enough for an adult to stand upright and move naturally.
• If furniture is mentioned, ensure clearance for furniture and walking paths.
• If the build involves humans working inside, the space must support standing, kneeling, lifting, and tool usage without distortion.
• Enforce realistic construction proportions even if the user does not provide dimensions.
• By default, all projects are intended to be human-usable unless explicitly mentioned otherwise. If scale is ambiguous, default to small-but-usable human-scale construction, not miniature or utility-scale. Only ask the user if intent is ambiguous (e.g., triggers like "hole", "structure", "space"). Then ask ONE smart question, not dimensions: "Should this be human-usable (standing room / interior space) or small utility-scale?". No meters. No math.

🖼️ FRAME PROMPT STRUCTURE (Repeat 12-20x with stage changes)
Each frame must include these sections:
SCENE LOCK: Static tripod camera, same framing across all stages, [lens type], camera height approx [X feet/meters], consistent lighting direction and time of day. Fixed landmarks: [list 3–5 landmarks that must remain unchanged]. All structures are built at realistic human scale...
STAGE: [Describe condition for this stage: ruined / active construction / finished clean]
CONSTRUCTION LOGIC CONTINUITY: No workers visible. This image represents the completed result of the previous construction phase. Changes must:
• Reflect realistic tool usage
• Follow correct installation order
• Show logical material staging
• Preserve previous geometry except modified areas
• Scale progress according to provided worker count
No teleport artifacts. No impossible assembly. No sudden full rebuilds.
DETAILS: Include realistic construction behavior: dust, footprints, debris piles, extension cords, scaffolding, tool marks, PPE, cones, shadows, surface imperfections, reflections behaving physically correct.
NEGATIVE: No text, no logos, no watermarks, no warped geometry, no floating objects...

HOOK FORMAT:
• Vertical 9:16
• Photorealistic, natural colors
• Tripod-locked camera (static)`}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><CodeSquare className="w-6 h-6 text-indigo-500" /> Video Sync Protocol</h3>
                  <div className="bg-[#0f0f11] text-gray-300 p-6 md:p-10 rounded-3xl font-mono text-sm leading-relaxed whitespace-pre-wrap border border-gray-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    {`[00:00-00:02] 
Static tripod locked medium shot.
Worker with black jacket with white bold text "BZA" written in the back, gray pant, yellow construction helmet, shoes and black wrist watch [Explicit Action].
Hyper-lapse speed motion.
SFX: satisfying ASMR sounds of [sounds].
No Ambient sounds, No Noise, No Music.

[00:02-00:04]
Static tripod locked medium shot. 
The same worker rapidly [Explicit Action].
Hyper-lapse speed motion.
SFX: satisfying ASMR sounds of [sounds]. 
No Ambient sounds, No Noise, No Music.

[00:04-00:06] 
Static tripod locked medium shot.
The same worker rapidly [Explicit Action].
Hyper-lapse speed motion. 
SFX: satisfying ASMR sounds of [sounds]. 
No Ambient sounds, No Noise, No Music.

[00:06-00:08] 
Static tripod locked medium shot.
The same worker rapidly [Explicit Action].
Hyper-lapse speed motion.
SFX: satisfying ASMR sounds of [sounds]. 
No Ambient sounds, No Noise, No Music.`}
                  </div>
                </div>

              </div>
            ) : <DummyContent />}
          </div>

        </div>
      </div>
    </div>
  )
}