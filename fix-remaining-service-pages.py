#!/usr/bin/env python3
"""
Add blog links to service pages without FAQ sections (before CTA section).
"""

service_blog_mapping = {
    "apartment-moving.astro": {
        "service_name": "Apartment Moving",
        "blogs": [
            {
                "question": "How do I move an apartment efficiently?",
                "url": "/blog/how-to-move-an-apartment-in-denver",
                "description": "Complete guide for apartment moves with limited space"
            },
            {
                "question": "What about elevator and HOA rules?",
                "url": "/blog/how-to-move-into-downtown-denver-condo-elevator-hoa-rules",
                "description": "Navigate building restrictions and reserve elevators"
            },
            {
                "question": "How should I pack for an apartment move?",
                "url": "/blog/how-to-pack-clothes-for-a-move-denver",
                "description": "Space-saving packing strategies for smaller moves"
            }
        ]
    },
    "senior-assisted-moving.astro": {
        "service_name": "Senior Assisted Moving",
        "blogs": [
            {
                "question": "How do I downsize before moving?",
                "url": "/blog/downsizing-before-moving-denver",
                "description": "Practical strategies for seniors transitioning to smaller homes"
            },
            {
                "question": "What should I declutter before moving?",
                "url": "/blog/how-to-declutter-before-moving",
                "description": "Room-by-room guide to reducing belongings"
            },
            {
                "question": "What are the signs of a bad moving company?",
                "url": "/blog/5-signs-youre-hiring-a-bad-moving-company",
                "description": "Protect seniors from moving scams and unprofessional movers"
            }
        ]
    }
}

related_reading_template = """
  <!-- Related Reading Section - Blog Links -->
  <section class="py-16 bg-white border-b border-gray-100">
    <div class="container">
      <div class="max-w-3xl mx-auto">
        <h2 class="font-display font-bold text-3xl md:text-4xl mb-10 text-secondary text-center">
          Related <span class="text-primary">Reading</span>
        </h2>
        
        <div class="space-y-4">
{blog_items}
        </div>
        
        <div class="mt-8 text-center">
          <a href="/blog" class="inline-flex items-center text-primary font-medium hover:underline">
            Browse all moving tips and guides
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
"""

blog_item_template = """          <!-- Blog Link {index} -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <a href="{url}" class="block p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset hover:bg-gray-50 transition-colors">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="font-display font-semibold text-xl text-secondary mb-2 hover:text-primary transition-colors">{question}</h3>
                  <p class="text-muted-foreground text-sm">{description}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-4 mt-1 text-primary flex-shrink-0">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </a>
          </div>
"""

def add_blog_links_to_service(filename, mapping):
    """Add blog links section to a service page before the CTA section."""
    filepath = f"src/pages/services/{filename}"
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already has Related Reading section
        if "Related Reading Section" in content or "Related <span class=\"text-primary\">Reading</span>" in content:
            print(f"⚠️  {filename} already has Related Reading section, skipping...")
            return False
        
        # Build blog items HTML
        blog_items_html = ""
        for i, blog in enumerate(mapping["blogs"], 1):
            blog_items_html += blog_item_template.format(
                index=i,
                url=blog["url"],
                question=blog["question"],
                description=blog["description"]
            )
        
        # Build complete section
        related_reading_section = related_reading_template.format(
            blog_items=blog_items_html
        )
        
        # Find CTA section marker
        cta_markers = [
            "<!-- CTA Section -->",
            "Ready to Book",
            "bg-gradient-to-br from-primary to-primary-dark"
        ]
        
        insertion_done = False
        for marker in cta_markers:
            if marker in content:
                # Find the start of the section tag that contains this marker
                marker_pos = content.find(marker)
                # Go backwards to find the <section> tag
                section_start = content.rfind("<section", 0, marker_pos)
                
                if section_start != -1:
                    # Insert before the CTA section
                    new_content = content[:section_start] + related_reading_section + "\n" + content[section_start:]
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    print(f"✓ Added 3 blog links to {filename}")
                    insertion_done = True
                    break
        
        if not insertion_done:
            print(f"⚠️  Could not find CTA section marker in {filename}")
            return False
        
        return True
        
    except FileNotFoundError:
        print(f"✗ File not found: {filepath}")
        return False
    except Exception as e:
        print(f"✗ Error processing {filename}: {str(e)}")
        return False

def main():
    """Process remaining service pages and add blog links."""
    print("=" * 60)
    print("Adding Blog Links to Remaining Service Pages")
    print("=" * 60)
    
    success_count = 0
    total_count = len(service_blog_mapping)
    
    for filename, mapping in service_blog_mapping.items():
        print(f"\nProcessing {mapping['service_name']}...")
        if add_blog_links_to_service(filename, mapping):
            success_count += 1
    
    print("\n" + "=" * 60)
    print(f"✓ Successfully added blog links to {success_count}/{total_count} service pages")
    print("=" * 60)

if __name__ == "__main__":
    main()
