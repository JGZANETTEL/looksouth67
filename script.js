(() => {
      const modal = document.getElementById('bookModal');
      const opener = document.getElementById('openBook');
      const closer = document.getElementById('closeModal');
      let priorFocus = null;
      function closeModal(){modal.classList.remove('open');document.body.classList.remove('body-lock');priorFocus?.focus();}
      opener.addEventListener('click',()=>{priorFocus=document.activeElement;modal.classList.add('open');document.body.classList.add('body-lock');closer.focus();});
      closer.addEventListener('click',closeModal);
      modal.addEventListener('click',(e)=>{if(e.target===modal)closeModal();});
      document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();if(e.key==='Tab'&&modal.classList.contains('open')){const nodes=[...modal.querySelectorAll('a[href],button:not([disabled])')];const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
      document.getElementById('shareSite').addEventListener('click',async()=>{
        const url=location.protocol==='file:'?'https://looksouth67.com/':location.href;
        if(navigator.share){try{await navigator.share({title:'LookSouth67',text:'Conheça os projetos da LookSouth67',url});return;}catch(err){if(err.name==='AbortError')return;}}
        try{await navigator.clipboard.writeText(url);const el=document.getElementById('shareSite');el.setAttribute('title','Link copiado!');el.setAttribute('aria-label','Link copiado!');}catch{window.prompt('Copie o link da LookSouth67:',url);}
      });
    })();