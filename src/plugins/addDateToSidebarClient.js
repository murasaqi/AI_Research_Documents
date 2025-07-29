import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  console.log('Date sidebar plugin loaded');
  
  // Function to add dates to sidebar items
  function addDatesToSidebar() {
    // Find all sidebar links
    const sidebarLinks = document.querySelectorAll('.menu__link');
    console.log('Found sidebar links:', sidebarLinks.length);
    
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || link.querySelector('.sidebar-date')) return; // Skip if no href or already has date
      
      // Extract date from URL if it matches the date pattern
      const dateMatch = href.match(/(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        const dateStr = dateMatch[1];
        
        // Create a wrapper div to contain both title and date
        const wrapper = document.createElement('div');
        wrapper.className = 'sidebar-item-wrapper';
        
        // Clone the link content
        const titleText = link.textContent.trim();
        
        // Create title element
        const titleElement = document.createElement('div');
        titleElement.className = 'sidebar-item-title';
        titleElement.textContent = titleText;
        
        // Create date element
        const dateElement = document.createElement('div');
        dateElement.className = 'sidebar-date';
        dateElement.textContent = dateStr;
        
        // Clear the link and add the new structure
        link.textContent = '';
        wrapper.appendChild(titleElement);
        wrapper.appendChild(dateElement);
        link.appendChild(wrapper);
      }
    });
  }
  
  // Use a more robust approach to ensure the sidebar is loaded
  function initializeDateDisplay() {
    // Try to add dates immediately
    addDatesToSidebar();
    
    // Set up mutation observer for dynamic updates
    const observer = new MutationObserver((mutations) => {
      // Only process if there are actual link changes
      const hasLinkChanges = mutations.some(mutation => 
        mutation.type === 'childList' && 
        (mutation.target.classList.contains('menu__list') || 
         mutation.target.classList.contains('menu__link'))
      );
      
      if (hasLinkChanges) {
        addDatesToSidebar();
      }
    });
    
    // Observe the entire document for sidebar changes
    const targetNode = document.querySelector('.theme-doc-sidebar-container') || document.body;
    observer.observe(targetNode, { 
      childList: true, 
      subtree: true 
    });
  }
  
  // Try multiple initialization strategies
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDateDisplay);
  } else {
    initializeDateDisplay();
  }
  
  // Also try after a short delay to catch late-loading content
  setTimeout(initializeDateDisplay, 1000);
}