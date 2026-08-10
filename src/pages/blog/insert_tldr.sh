#!/bin/bash

# For downsizing-before-moving-denver.astro
sed -i '27a\
\
  <!-- TL;DR Summary Box -->\
  <section class="py-6 bg-primary/5 border-b border-primary/10">\
    <div class="container">\
      <div class="max-w-4xl mx-auto">\
        <div class="bg-white rounded-lg border-l-4 border-primary p-6 shadow-sm">\
          <h2 class="font-display font-bold text-xl mb-3 text-secondary flex items-center gap-2">\
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>\
            TL;DR: Quick Summary\
          </h2>\
          <div class="text-muted-foreground space-y-2 text-sm">\
            <p><strong>What:</strong> Strategic decluttering and downsizing strategies before a Denver move</p>\
            <p><strong>Key Actions:</strong> Start 6-8 weeks early, use the one-year rule, donate/sell items, measure new space</p>\
            <p><strong>Red Flags:</strong> Keeping items just in case, emotional hoarding, not measuring furniture for new space</p>\
            <p><strong>Bottom Line:</strong> Less stuff = lower moving costs and easier unpacking. Sell valuable items, donate usable goods, trash the rest.</p>\
          </div>\
        </div>\
      </div>\
    </div>\
  </section>' downsizing-before-moving-denver.astro

echo "✓ Added TL;DR to downsizing-before-moving-denver.astro"

# For moving-home-office-denver-equipment-files.astro  
sed -i '27a\
\
  <!-- TL;DR Summary Box -->\
  <section class="py-6 bg-primary/5 border-b border-primary/10">\
    <div class="container">\
      <div class="max-w-4xl mx-auto">\
        <div class="bg-white rounded-lg border-l-4 border-primary p-6 shadow-sm">\
          <h2 class="font-display font-bold text-xl mb-3 text-secondary flex items-center gap-2">\
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>\
            TL;DR: Quick Summary\
          </h2>\
          <div class="text-muted-foreground space-y-2 text-sm">\
            <p><strong>What:</strong> Specialized packing and moving strategies for home office equipment</p>\
            <p><strong>Key Actions:</strong> Back up all data, photograph cable setups, use original boxes, label everything, pack tech last</p>\
            <p><strong>Red Flags:</strong> No data backup, thrown-away cable photos, generic boxes for electronics, tech packed first</p>\
            <p><strong>Bottom Line:</strong> Back up everything before moving. Photograph all cable setups. Use original boxes or heavy padding for electronics.</p>\
          </div>\
        </div>\
      </div>\
    </div>\
  </section>' moving-home-office-denver-equipment-files.astro

echo "✓ Added TL;DR to moving-home-office-denver-equipment-files.astro"

# For moving-to-denver-from-another-state.astro
sed -i '27a\
\
  <!-- TL;DR Summary Box -->\
  <section class="py-6 bg-primary/5 border-b border-primary/10">\
    <div class="container">\
      <div class="max-w-4xl mx-auto">\
        <div class="bg-white rounded-lg border-l-4 border-primary p-6 shadow-sm">\
          <h2 class="font-display font-bold text-xl mb-3 text-secondary flex items-center gap-2">\
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>\
            TL;DR: Quick Summary\
          </h2>\
          <div class="text-muted-foreground space-y-2 text-sm">\
            <p><strong>What:</strong> Complete relocation guide for out-of-state moves to Denver</p>\
            <p><strong>Key Actions:</strong> Research neighborhoods, understand altitude, get Colorado driver license within 90 days, register vehicle</p>\
            <p><strong>Red Flags:</strong> Not visiting first, ignoring altitude adjustment, missing DMV deadlines, no job lined up</p>\
            <p><strong>Bottom Line:</strong> Visit Denver first to feel altitude. License/registration due within 90 days. Research neighborhoods thoroughly—Denver metro is huge.</p>\
          </div>\
        </div>\
      </div>\
    </div>\
  </section>' moving-to-denver-from-another-state.astro

echo "✓ Added TL;DR to moving-to-denver-from-another-state.astro"

