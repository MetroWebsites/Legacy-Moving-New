#!/usr/bin/env python3
"""
Script to add TL;DR sections to all blog posts
"""

import os
import re

# Define TL;DR content for each blog post (based on filename)
tldr_content = {
    "5-signs-youre-hiring-a-bad-moving-company.astro": {
        "what": "Red flags that indicate a moving company is unprofessional or potentially fraudulent",
        "key_actions": "Check licensing, verify insurance, read reviews, get written estimates, avoid cash-only deposits",
        "red_flags": "No DOT/PUC numbers, extremely low quotes, poor communication, no physical address",
        "bottom_line": "Trust your gut—reputable movers are transparent, licensed, and have verifiable reviews. Cheap quotes often become expensive nightmares."
    },
    "best-denver-neighborhoods-for-families.astro": {
        "what": "Top family-friendly Denver neighborhoods with great schools, parks, and community",
        "key_actions": "Research school ratings, visit neighborhoods, check crime stats, consider commute times",
        "red_flags": "High crime rates, poor school districts, long commutes, lack of family amenities",
        "bottom_line": "Highlands Ranch, Stapleton, and Cherry Creek lead for families. Prioritize schools, safety, and community feel over trendy locations."
    },
    "best-time-of-year-to-move-in-colorado.astro": {
        "what": "Optimal moving seasons in Colorado considering weather, costs, and availability",
        "key_actions": "Book early for summer, consider off-season discounts, check weather forecasts, plan around school schedules",
        "red_flags": "Peak summer rates, winter weather delays, holiday surcharges, last-minute bookings",
        "bottom_line": "May-September is peak (expensive). Best deals: October-April. Balance cost savings with weather conditions and personal schedule."
    },
    "downsizing-before-moving-denver.astro": {
        "what": "Strategic decluttering and downsizing strategies before a Denver move",
        "key_actions": "Start 6-8 weeks early, use the one-year rule, donate/sell items, measure new space",
        "red_flags": "Keeping items 'just in case', emotional hoarding, not measuring furniture for new space",
        "bottom_line": "Less stuff = lower moving costs and easier unpacking. Sell valuable items, donate usable goods, trash the rest."
    },
    "families-moving-day-easier-denver-kids.astro": {
        "what": "Tips to make moving day smooth and stress-free for families with children",
        "key_actions": "Pack essentials bag, arrange childcare, prep kids emotionally, keep routines consistent",
        "red_flags": "No childcare plan, forgetting comfort items, not involving kids in process",
        "bottom_line": "Happy kids = easier move. Prepare them early, keep familiar routines, and consider having them stay with family on moving day."
    },
    "first-time-homeowner-moving-tips-denver.astro": {
        "what": "Essential moving advice for first-time Denver homebuyers",
        "key_actions": "Budget for hidden costs, schedule utilities early, do pre-move home inspection, update address with USPS",
        "red_flags": "Underestimating costs, forgetting utilities, not inspecting home before move, missing address updates",
        "bottom_line": "First moves are overwhelming. Plan for 20% more costs than expected, and don't skip the home inspection."
    },
    "how-far-in-advance-schedule-moving-company-denver.astro": {
        "what": "Ideal booking timeline for Denver movers by season and move type",
        "key_actions": "Book 4-8 weeks ahead for summer, 2-3 weeks for off-season, confirm 1 week before move",
        "red_flags": "Last-minute summer bookings, no confirmation call, verbal-only agreements",
        "bottom_line": "Summer moves: book 6-8 weeks early. Winter/spring: 2-4 weeks. Always get written confirmation."
    },
    "how-much-does-it-cost-to-hire-movers-in-denver.astro": {
        "what": "Complete pricing breakdown for Denver moving services and cost factors",
        "key_actions": "Get 3 written estimates, understand hourly vs flat rates, ask about fees, check insurance options",
        "red_flags": "Verbal-only quotes, large upfront deposits, unclear pricing, surprise fees on moving day",
        "bottom_line": "Local moves: $150-$200/hour (2-3 movers). Long distance: $3,000-$8,000+. Always get itemized written estimates."
    },
    "how-to-declutter-before-moving.astro": {
        "what": "Room-by-room decluttering system to reduce moving volume and costs",
        "key_actions": "Use the 4-box method (keep, donate, sell, trash), start with easy rooms, measure furniture for new space",
        "red_flags": "Packing items you don't use, moving broken items, not measuring furniture",
        "bottom_line": "Declutter = cheaper move. Rule of thumb: if you haven't used it in a year, let it go."
    },
    "how-to-hire-movers-for-long-distance-move-out-of-colorado.astro": {
        "what": "Comprehensive guide to selecting interstate movers from Colorado",
        "key_actions": "Verify USDOT/MC numbers, get binding estimates, check FMCSA records, understand insurance options",
        "red_flags": "No USDOT number, huge deposits required, estimating without inventory, holding items hostage",
        "bottom_line": "Interstate moves require federal licensing (USDOT/MC). Never pay more than 20% deposit. Use FMCSA database to verify."
    },
    "how-to-move-a-3-bedroom-home-efficiently.astro": {
        "what": "Step-by-step timeline and strategy for moving a 3-bedroom house",
        "key_actions": "Start packing 4 weeks out, label all boxes, disassemble furniture, reserve elevator/parking",
        "red_flags": "Waiting until last week, not labeling boxes, leaving furniture assembled, no parking plan",
        "bottom_line": "3-bedroom moves take 5-8 hours with professional movers. Proper packing saves 2-3 hours on moving day."
    },
    "how-to-move-an-apartment-in-denver.astro": {
        "what": "Complete apartment moving checklist specific to Denver rental units",
        "key_actions": "Reserve elevator, get parking permit, notify landlord, take move-in photos, review lease",
        "red_flags": "No elevator reservation, forgotten damage deposit, missing move-out inspection",
        "bottom_line": "Reserve elevator 2 weeks early. Document everything with photos. 90% of deposit disputes involve lack of documentation."
    },
    "how-to-move-in-winter-colorado.astro": {
        "what": "Cold-weather moving strategies for Colorado winters",
        "key_actions": "Check weather forecast, protect floors from snow, wrap electronics, have backup date",
        "red_flags": "Moving during snowstorm, no floor protection, not winterizing plants, cold electronics",
        "bottom_line": "Winter moves are cheaper but risky. Always have a backup date and protect floors from salt/snow damage."
    },
    "how-to-move-into-downtown-denver-condo-elevator-hoa-rules.astro": {
        "what": "Navigating Denver high-rise moving requirements and HOA regulations",
        "key_actions": "Reserve elevator 3-4 weeks early, get certificate of insurance from mover, review HOA rules, schedule move during allowed hours",
        "red_flags": "No elevator reservation, missing COI, moving outside allowed hours, damaging common areas",
        "bottom_line": "Downtown buildings require advance planning. Reserve elevator early, get mover's COI, and follow HOA moving hours strictly."
    },
    "how-to-move-with-pets-denver.astro": {
        "what": "Pet-friendly moving strategies to reduce stress for animals during relocation",
        "key_actions": "Keep pets in quiet room on moving day, update vet records, don't feed before travel, acclimate to new home gradually",
        "red_flags": "Pets loose during move, forgetting medications, immediate freedom in new house",
        "bottom_line": "Pets sense stress. Keep them away from moving chaos, maintain feeding schedules, and introduce new home one room at a time."
    },
    "how-to-pack-a-kitchen-for-a-move-without-breaking-anything.astro": {
        "what": "Professional kitchen packing techniques to prevent breakage",
        "key_actions": "Use dish boxes, wrap each item, pack heavy items in small boxes, label fragile clearly",
        "red_flags": "Using regular boxes for dishes, packing too heavy, not wrapping individually, no padding",
        "bottom_line": "Kitchen packing takes the longest. Use proper dish boxes, wrap everything, and pack heavy items (cans, pots) in small boxes only."
    },
    "how-to-pack-clothes-for-a-move-denver.astro": {
        "what": "Efficient clothing packing methods that save time and prevent wrinkles",
        "key_actions": "Use wardrobe boxes for hanging clothes, vacuum seal out-of-season items, keep dresser items in drawers",
        "red_flags": "Packing all clothes in boxes, emptying dressers completely, no protection for nice items",
        "bottom_line": "Wardrobe boxes save hours. Leave clothes in dressers (if moving locally). Vacuum-seal bulky off-season items."
    },
    "how-to-prepare-home-for-professional-movers-denver.astro": {
        "what": "Pre-move preparation checklist to maximize moving day efficiency",
        "key_actions": "Clear pathways, protect floors, disconnect appliances, park vehicles, have cash for tip",
        "red_flags": "Cluttered walkways, no floor protection, appliances still connected, no parking space",
        "bottom_line": "Preparation shaves 1-2 hours off moving time. Clear paths, protect floors, and have everything ready before movers arrive."
    },
    "how-to-prepare-pets-for-moving-day-denver.astro": {
        "what": "Step-by-step pet preparation for moving day stress reduction",
        "key_actions": "Vet checkup before move, update microchip info, keep routines consistent, designate safe room",
        "red_flags": "No vet visit, outdated contact info, breaking routines, letting pets roam during move",
        "bottom_line": "Update all pet info before moving. Keep them confined in quiet room during move. Gradual introduction to new home prevents anxiety."
    },
    "how-to-safely-move-large-appliances-denver.astro": {
        "what": "Safe appliance moving techniques for washers, dryers, refrigerators",
        "key_actions": "Disconnect 24hrs before, drain water lines, secure doors, use appliance dolly, measure doorways",
        "red_flags": "Not draining water, moving refrigerator immediately, doors unsecured, no measurements",
        "bottom_line": "Drain all water lines 24hrs before move. Refrigerators need 24hrs to settle before plugging in. Measure doorways first."
    },
    "how-to-save-money-on-your-move-denver.astro": {
        "what": "Cost-cutting strategies for Denver moves without sacrificing quality",
        "key_actions": "Move off-season, pack yourself, declutter first, get multiple quotes, avoid peak days",
        "red_flags": "Booking peak summer weekends, not decluttering, accepting first quote, hiring cheapest mover",
        "bottom_line": "Save 30-40% by moving mid-week in winter. Pack yourself but hire professional movers—injuries cost more than movers."
    },
    "moving-day-mistakes-to-avoid-denver.astro": {
        "what": "Common moving day errors that cost time, money, and stress",
        "key_actions": "Confirm movers 24hrs ahead, have payment ready, stay present, do final walkthrough",
        "red_flags": "No confirmation call, wrong payment method, leaving during move, skipping walkthrough",
        "bottom_line": "Be present during the move, confirm everything 24hrs ahead, and do a thorough final walkthrough before leaving."
    },
    "moving-home-office-denver-equipment-files.astro": {
        "what": "Specialized packing and moving strategies for home office equipment",
        "key_actions": "Back up all data, photograph cable setups, use original boxes, label everything, pack tech last",
        "red_flags": "No data backup, thrown-away cable photos, generic boxes for electronics, tech packed first",
        "bottom_line": "Back up everything before moving. Photograph all cable setups. Use original boxes or heavy padding for electronics."
    },
    "moving-into-historic-denver-homes-narrow-hallways-stairs.astro": {
        "what": "Navigating tight spaces and architectural challenges in historic Denver homes",
        "key_actions": "Measure all doorways/hallways, disassemble furniture, use professional riggers, protect historic features",
        "red_flags": "Not measuring, keeping furniture assembled, DIY rigging, no protection for wood floors/trim",
        "bottom_line": "Historic homes need careful planning. Measure everything, hire professionals for large items, and protect original features."
    },
    "moving-to-denver-from-another-state.astro": {
        "what": "Complete relocation guide for out-of-state moves to Denver",
        "key_actions": "Research neighborhoods, understand altitude, get Colorado driver's license within 90 days, register vehicle",
        "red_flags": "Not visiting first, ignoring altitude adjustment, missing DMV deadlines, no job lined up",
        "bottom_line": "Visit Denver first to feel altitude. License/registration due within 90 days. Research neighborhoods thoroughly—Denver metro is huge."
    },
    "moving-to-denver-new-resident-guide.astro": {
        "what": "Essential checklist and local knowledge for new Denver residents",
        "key_actions": "Update driver's license, register to vote, find doctors, learn RTD system, buy winter gear",
        "red_flags": "Missing voter registration, no local doctors, ignoring public transit, unprepared for winter",
        "bottom_line": "Handle DMV stuff within 90 days. Get snow tires. RTD is great for downtown/airport. Altitude affects everyone—hydrate constantly."
    },
    "moving-to-downtown-denver-apartments-elevators-parking-hoa.astro": {
        "what": "Downtown Denver apartment moving logistics and building requirements",
        "key_actions": "Reserve elevator 3-4 weeks ahead, get parking permits, review move-in rules, schedule during allowed hours",
        "red_flags": "Last-minute elevator request, no parking plan, violating HOA hours, damaging elevators",
        "bottom_line": "Downtown moves require serious planning. Reserve elevator early, follow HOA rules strictly, or face fines up to $500."
    },
    "moving-with-kids-denver-family-moving-guide.astro": {
        "what": "Comprehensive family moving guide with kid-focused strategies",
        "key_actions": "Involve kids in planning, keep routines, pack comfort items last, arrange childcare for move day",
        "red_flags": "Not telling kids until last minute, breaking all routines, packing favorite toys first",
        "bottom_line": "Talk to kids early, keep familiar routines, and consider having them elsewhere on moving day. Familiar items = less anxiety."
    },
    "true-cost-of-moving-in-denver.astro": {
        "what": "Complete breakdown of all moving costs including hidden expenses",
        "key_actions": "Budget for movers, supplies, utilities, deposits, cleaning, storage, and 20% contingency",
        "red_flags": "Only budgeting mover costs, no contingency fund, forgetting deposits, ignoring cleaning fees",
        "bottom_line": "Average Denver move costs $2,000-$5,000 all-in. Add 20% contingency. Biggest hidden costs: deposits, supplies, cleaning."
    },
    "what-moving-insurance-do-i-need-for-my-denver-move.astro": {
        "what": "Moving insurance options and coverage recommendations",
        "key_actions": "Understand basic coverage (60¢/lb), consider full-value protection, document high-value items, read policy details",
        "red_flags": "Accepting basic coverage only, not documenting valuables, not reading policy, skipping photos",
        "bottom_line": "Basic coverage is nearly worthless (60¢/lb). For valuable items, buy full-value protection. Document everything with photos."
    },
    "what-professional-movers-do-differently.astro": {
        "what": "Industry techniques that make professional movers faster and safer",
        "key_actions": "Proper lifting techniques, quality packing materials, efficient truck loading, floor protection",
        "red_flags": "DIY heavy lifting, cheap materials, poor truck packing, no floor protection",
        "bottom_line": "Pros move 3x faster than DIY. They use proper equipment, protect your property, and have insurance. Back injuries cost more than movers."
    },
    "what-to-do-if-you-need-temporary-storage-during-a-move-denver.astro": {
        "what": "Storage options and strategies for transition periods between homes",
        "key_actions": "Compare prices, choose climate control, get insurance, inventory everything, label clearly",
        "red_flags": "No climate control, no insurance, poor inventory, unlabeled boxes",
        "bottom_line": "Climate control prevents damage. Get insurance—facility insurance is minimal. Storage costs $50-$300/month depending on size."
    },
    "what-to-expect-on-moving-day-denver-timeline.astro": {
        "what": "Hour-by-hour moving day timeline and process explanation",
        "key_actions": "Be ready when movers arrive, do walkthrough together, stay available, do final inspection",
        "red_flags": "Not ready at arrival time, disappearing during move, skipping walkthroughs, no final check",
        "bottom_line": "Movers arrive, assess, load (3-4hrs), drive, unload (2-3hrs). Being prepared saves 1-2 hours and hundreds of dollars."
    },
    "what-to-label-on-moving-boxes-denver-colorado.astro": {
        "what": "Comprehensive box labeling system for efficient unpacking",
        "key_actions": "Write room AND contents, label all 4 sides, use color coding, mark fragile on all sides",
        "red_flags": "Only labeling one side, vague labels (just 'kitchen'), no fragile markings, no priority system",
        "bottom_line": "Label all 4 sides with room + specific contents. Color code by room. Mark 'UNPACK FIRST' on essential boxes."
    }
}

def add_tldr_to_blog(filepath, tldr):
    """Add TL;DR section to a blog post"""
    filename = os.path.basename(filepath)
    
    # Skip if already has TL;DR
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        if 'TL;DR' in content:
            print(f"✓ {filename} already has TL;DR, skipping")
            return False
    
    # Get TL;DR content for this blog
    if filename not in tldr:
        print(f"⚠ No TL;DR content defined for {filename}, skipping")
        return False
    
    blog_tldr = tldr[filename]
    
    # Create TL;DR HTML
    tldr_html = f'''  </section>

  <!-- TL;DR Summary Box -->
  <section class="py-6 bg-primary/5 border-b border-primary/10">
    <div class="container">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-lg border-l-4 border-primary p-6 shadow-sm">
          <h2 class="font-display font-bold text-xl mb-3 text-secondary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            TL;DR: Quick Summary
          </h2>
          <div class="text-muted-foreground space-y-2 text-sm">
            <p><strong>What:</strong> {blog_tldr['what']}</p>
            <p><strong>Key Actions:</strong> {blog_tldr['key_actions']}</p>
            <p><strong>Red Flags:</strong> {blog_tldr['red_flags']}</p>
            <p><strong>Bottom Line:</strong> {blog_tldr['bottom_line']}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Article Content -->'''
    
    # Replace the first occurrence of "</section>\n\n  <!-- Article Content -->"
    pattern = r'  </section>\s*\n\s*<!-- Article Content -->'
    
    if re.search(pattern, content):
        new_content = re.sub(pattern, tldr_html, content, count=1)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ Added TL;DR to {filename}")
        return True
    else:
        print(f"⚠ Could not find insertion point in {filename}")
        return False

def main():
    blog_dir = "src/pages/blog"
    
    if not os.path.exists(blog_dir):
        print(f"Error: {blog_dir} directory not found")
        return
    
    blog_files = [f for f in os.listdir(blog_dir) if f.endswith('.astro')]
    
    print(f"Processing {len(blog_files)} blog posts...")
    print("=" * 60)
    
    added = 0
    skipped = 0
    errors = 0
    
    for blog_file in sorted(blog_files):
        filepath = os.path.join(blog_dir, blog_file)
        result = add_tldr_to_blog(filepath, tldr_content)
        
        if result is True:
            added += 1
        elif result is False:
            skipped += 1
        else:
            errors += 1
    
    print("=" * 60)
    print(f"\nResults:")
    print(f"  ✓ Added TL;DR: {added}")
    print(f"  ⊘ Skipped: {skipped}")
    print(f"  ✗ Errors: {errors}")
    print(f"  Total: {len(blog_files)}")

if __name__ == "__main__":
    main()
