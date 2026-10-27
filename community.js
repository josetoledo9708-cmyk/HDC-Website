/* One sanitized snapshot drives the web and the prepared Discord cards. */
(() => {
    const copy = {
        es: {title:'Camino a la beta', label:'Progreso de efectos comprobados', event:'Sorpresa', confirmed:'efectos confirmados', updated:'Comprobado', policy:'¿Qué cuenta para esta barra?', rules:'Cada habilidad con texto cuenta una vez, aunque existan varias copias o rarezas. Solo cuentan confirmaciones directas. Las reparaciones pendientes de prueba, las dudas y las aprobaciones heredadas no completan la barra. El total puede cambiar al añadir cartas.', surprise:'Al completar la barra llegaremos a la beta y revelaremos una sorpresa. Sin fecha anunciada.', loading:'Consultando el progreso…', error:'No se pudo consultar el progreso. Intenta recargar la página.', updates:'Actualizaciones y aportes de la comunidad', available:'Disponible', upcoming:'Próxima actualización · en preparación', unreleased:'Estos cambios todavía no forman parte de la descarga pública.', thanks:'Gracias a', anonymous:'quienes lo reportaron (sin alias público registrado)', notes:'Notas completas', roadmap:'Ver hoja de ruta', reviewed:'Confirmado en Unity', pending:'Reparado · pendiente de confirmar', implemented:'Preparado · por verificar'},
        en: {title:'Road to beta', label:'Verified-effects progress', event:'Surprise', confirmed:'confirmed effects', updated:'Checked', policy:'What counts toward this bar?', rules:'Each text ability counts once, regardless of copies or rarities. Only direct confirmations count. Fixes awaiting testing, doubts and inherited approvals do not complete the bar. The total may change when cards are added.', surprise:'Completing the bar unlocks the beta milestone and a surprise. No date announced.', loading:'Checking progress…', error:'Progress could not be loaded. Please reload the page.', updates:'Updates and community contributions', available:'Available', upcoming:'Next update · in preparation', unreleased:'These changes are not included in the public download yet.', thanks:'Thanks to', anonymous:'the people who reported this (no public alias recorded)', notes:'Full patch notes', roadmap:'View the roadmap', reviewed:'Confirmed in Unity', pending:'Fixed · awaiting confirmation', implemented:'Prepared · awaiting review'},
        ja: {title:'ベータ版への道', label:'動作確認済み効果の進捗', event:'サプライズ', confirmed:'確認済み効果', updated:'確認日時', policy:'このバーの集計方法', rules:'テキストのある各効果を、枚数やレアリティにかかわらず1件として集計します。直接確認された効果のみを計上し、未検証の修正、疑問、類似効果からの承認は含めません。カード追加により総数が変わることがあります。', surprise:'達成するとβの目標に到達し、サプライズを発表します。日程は未定です。', loading:'進捗を確認中…', error:'進捗を読み込めませんでした。ページを再読み込みしてください。', updates:'更新情報とコミュニティの貢献', available:'公開中', upcoming:'次回更新・準備中', unreleased:'これらの変更は現在の公開版には含まれていません。', thanks:'報告への感謝：', anonymous:'報告してくださった皆様（公開名の記録なし）', notes:'更新履歴', roadmap:'ロードマップ', reviewed:'Unityで確認済み', pending:'修正済み・確認待ち', implemented:'実装準備済み・表示確認待ち'}
    };
    const lang = () => copy[document.documentElement.lang] ? document.documentElement.lang : 'en';
    const local = value => value?.[lang()] || value?.en || '';
    const el = (tag, cls, text) => { const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n; };
    let progress, updates, failed=false;
    function renderProgress(root) {
        const t=copy[lang()];root.replaceChildren(el('h3','',t.title));
        if (!progress) {root.append(el('p',failed?'progress-error':'',failed?t.error:t.loading));return;}
        const art=el('div','progress-art');const track=el('div','progress-track');
        track.setAttribute('role','progressbar');track.setAttribute('aria-label',t.label);track.setAttribute('aria-valuemin','0');track.setAttribute('aria-valuemax','100');track.setAttribute('aria-valuenow',String(progress.percent));track.setAttribute('aria-valuetext',`${progress.confirmed} / ${progress.total}`);
        const fill=el('div','progress-fill');fill.style.setProperty('--progress',`${progress.percent}%`);
        const comet=el('span','progress-comet');comet.setAttribute('aria-hidden','true');
        comet.innerHTML='<svg viewBox="0 0 32 32"><path fill="#efffff" stroke="#8bddff" d="M16 1 20 12 31 16 20 20 16 31 12 20 1 16 12 12Z"/></svg>';
        fill.append(comet);track.append(fill);art.append(track,el('div','progress-caption',`${progress.percent.toLocaleString(lang())}% · ${t.label}`),el('div','progress-question','?'),el('div','progress-event',t.event));
        const numbers=el('div','progress-numbers');const stamp=new Date(progress.updatedAt);
        numbers.append(el('span','progress-count',`${progress.confirmed.toLocaleString(lang())} / ${progress.total.toLocaleString(lang())} ${t.confirmed}`),el('time','progress-date',`${t.updated}: ${new Intl.DateTimeFormat(lang(),{dateStyle:'medium',timeStyle:'short'}).format(stamp)}`));numbers.lastChild.dateTime=progress.updatedAt;
        const policy=el('details','progress-policy');policy.append(el('summary','',t.policy),el('p','',t.rules));
        root.append(art,numbers,el('p','',t.surprise),policy);
    }
    function renderUpdates(root) {
        const t=copy[lang()];root.replaceChildren(el('h3','',t.updates));if(!updates)return;
        for (const release of updates.releases) {
            const article=el('article','community-release');article.append(el('h4','',release.version?`HDC ${release.version}`:t.upcoming),el('span','community-status',release.version?t.available:t.upcoming));
            if(!release.version)article.append(el('p','',t.unreleased));
            const list=el('ul','');for(const item of release.items){
                const li=el('li','');li.append(el('strong','',local(item.title)),el('span','community-detail',local(item.description)));
                if(item.status)li.append(el('span','community-status',t[item.status]||item.status));
                if(item.reported)li.append(el('span','community-thanks',`${t.thanks} ${item.reporters?.length?item.reporters.join(', '):t.anonymous}.`));
                list.append(li);
            }article.append(list);root.append(article);
        }
        const links=el('div','community-links');for(const [href,label] of [['NOTAS_DE_VERSION.md',t.notes],['#roadmap',t.roadmap]]){const a=el('a','',label);a.href=href;links.append(a);}root.append(links);
    }
    const render = () => {document.querySelectorAll('[data-community-progress]').forEach(renderProgress);document.querySelectorAll('[data-community-updates]').forEach(renderUpdates);};
    async function refresh() {
        try {const url=location.hostname==='127.0.0.1'||location.hostname==='localhost'?'data/effect-progress.json':'https://tcgholo-gate.josetoledo9708.workers.dev/v1/public/progress';
            const r=await fetch(url,{cache:'no-cache'});if(!r.ok)throw Error('progress');const data=await r.json();
            if(data.schema!==1||!Number.isInteger(data.total)||data.total<=0||!Number.isInteger(data.confirmed)||data.confirmed<0||data.confirmed>data.total||!Number.isFinite(data.percent)||data.percent<0||data.percent>100||!Number.isFinite(Date.parse(data.updatedAt)))throw Error('data');
            const expected=data.confirmed===data.total?100:Math.min(99.9,Math.round(data.confirmed/data.total*1000)/10);if(data.percent!==expected)throw Error('percentage');
            progress=data;failed=false;
        } catch {failed=true;}render();
    }
    document.addEventListener('DOMContentLoaded',async()=>{
        render();new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
        refresh();try{const r=await fetch('data/community-updates.json',{cache:'no-cache'});if(r.ok)updates=await r.json();}catch{}render();
        setInterval(()=>{if(!document.hidden)refresh();},300000);
    });
})();
