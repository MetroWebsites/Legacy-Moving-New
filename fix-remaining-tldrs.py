#!/usr/bin/env python3
import os
import re

# TL;DR content for remaining blogs
tldr_content = {
    "5-signs-youre-hiring-a-bad-moving-company.astro": {
        "what": "Red flags that indicate a moving company is unprofessional or potentially fraudulent",
        "key_actions": "Check licensing, verify insurance, read reviews, get written estimates, avoid cash-only deposits",
        "red_flags": "No DOT/PUC numbers, extremely low quotes, poor communication, no physical address",
        "bottom_line": "Trust your gut—reputable movers are transparent, licensed, and have verifiable reviews. Cheap quotes often become expensive nightmares."
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
    "how-much-does-it-cost-to-hire-movers-in-denver.astro": {
        "what": "Complete pricing breakdown for Denver moving services and cost factors",
        "key_actions": "Get 3 written estimates, understand hourly vs flat rates, ask about fees, check insurance options",
        "red_flags": "Verbal-only quotes, large upfront deposits, unclear pricing, surprise fees on moving day",
        "bottom_line": "Local moves: $150-$200/hour (2-3 movers). Long distance: $3,000-$8,000+. Always get itemized written estimates."
    },
    "how-to-move-a-3-bedroom-home-efficiently.astro": {
        "what": "Step-by-step timeline and strategy for moving a 3-bedroom house",
        "key_actions": "Start packing 4 weeks out, label all boxes, disassemble furniture, reserve elevator/parking",
        "red_flags": "Waiting until last week, not labeling boxes, leaving furniture assembled, no parking plan",
        "bottom_line": "3-bedroom moves take 5-8 hours with professional movers. Proper packing saves 2-3 hours on moving day."
    },
    "moving-home-office-denver-equipment-files.astro": {
        "what": "Specialized packing and moving strategies for home office equipment",
        "key_actions": "Back up all data, photograph cable setups, use original boxes, label everything, pack tech last",
        "red_flags": "No data backup, thrown-away cable photos, generic boxes for electronics, tech packed first",
        "bottom_line": "Back up everything before moving. Photograph all cable setups. Use original boxes or heavy padding for electronics."
    },
    "moving-to-denver-from-another-state.astro": {
        "what": "Complete relocation guide for out-of-state moves to Denver",
        "key_actions": "Research neighborhoods, understand altitude, get Colorado driver's license within 90 days, register vehicle",
        "red_flags": "Not visiting first, ignoring altitude adjustment, missing DMV deadlines, no job lined up",
        "bottom_line": "Visit Denver first to feel altitude. License/registration due within 90 days. Research neighborhoods thoroughly—Denver metro is huge."
    },
    "what-professional-movers-do-differently.astro": {
        "what": "Industry techniques that make professional movers faster and safer",
        "key_actions": "Proper lifting techniques, quality packing materials, efficient truck loading, floor protection",
        "red_flags": "DIY heavy lifting, cheap materials, poor truck packing, no floor protection",
        "bottom_line": "Pros move 3x faster than DIY. They use proper equipment, protect your property, and have insurance. Back injuries cost more than movers."
    }
}

def add_tldr(filepath, tldr):
    filename = os.path.basename(filepath)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'TL;DR' in content:
        print(f"✓ {filename} already has TL;DR, skipping")
        return False
    
    if filename not in tldr:
        print(f"⚠ No TL;DR for {filename}")
        return False
    
    blog_tldr = tldr[filename]
    
    tldr_html = f'''
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

  <!-- Article -->\n  <article class="py-12 md:py-16">'''
    
    # Try to insert before <article tag
    pattern = r'\n  <!-- Article -->\n  <article class="py-12 md:py-16">'
    if re.search(pattern, content):
        new_content = re.sub(pattern, tldr_html, content, count=1)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ Added TL;DR to {filename}")
        return True
    else:
        # Try alternative pattern
        pattern2 = r'  </section>\n\n  <!-- Article -->\n  <article'
        if re.search(pattern2, content):
            new_content = re.sub(pattern2, f'  </section>\n{tldr_html}', content, count=1)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Added TL;DR to {filename} (pattern 2)")
            return True
        
        print(f"⚠ Could not find insertion point in {filename}")
        return False

def main():
    blog_dir = "src/pages/blog"
    
    for filename in tldr_content.keys():
        filepath = os.path.join(blog_dir, filename)
        if os.path.exists(filepath):
            add_tldr(filepath, tldr_content)

if __name__ == "__main__":
    main()
