import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Aria",
    username: "@aria.explores",
    body: "Triply planned my entire Bali trip in seconds. I'm obsessed!",
    img: "https://avatar.vercel.sh/aria",
  },
  {
    name: "Rohan",
    username: "@rohan.codes",
    body: "Didn’t think AI could plan travel this well. Triply nailed it.",
    img: "https://avatar.vercel.sh/rohan",
  },
  {
    name: "Mei",
    username: "@wandering.mei",
    body: "Personalized, beautiful, and surprisingly smart. Triply is a game-changer!",
    img: "https://avatar.vercel.sh/mei",
  },
  {
    name: "Karan",
    username: "@karan.moves",
    body: "From budget to hotel picks, everything felt tailor-made. Bravo Triply!",
    img: "https://avatar.vercel.sh/karan",
  },
  {
    name: "Nia",
    username: "@niatravelbug",
    body: "Triply made my Paris itinerary smarter than any travel agent ever could.",
    img: "https://avatar.vercel.sh/nia",
  },
  {
    name: "Luca",
    username: "@luca.local",
    body: "AI + travel = magic. Triply is now my go-to planner.",
    img: "https://avatar.vercel.sh/luca",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}