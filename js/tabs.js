(function(d){
    let tabs = Array.prototype.slice.apply(d.querySelectorAll('.tab-item-js'));
    let panels = Array.prototype.slice.apply(d.querySelectorAll('.tab'));

    d.getElementById('cont-tabs').addEventListener('click', e => {
        if (e.target.classList.contains('tab-item-js')) {
            let i = tabs.indexOf(e.target);
            tabs.map(tab => tab.classList.remove('active'));
            tabs[i].classList.add('active');
            panels.map(panel => panel.classList.remove('active'));
            panels[i].classList.add('active');
        }
    });
})(document);