Ext.define('Proxmox.node.DNSView', {
    extend: 'Proxmox.grid.ObjectGrid',
    alias: ['widget.proxmoxNodeDNSView'],

    initComponent: function() {
	let me = this;

	if (!me.nodename) {
	    throw "no node name specified";
	}

	let run_editor = () => Ext.create('Proxmox.node.DNSEdit', {
	    autoShow: true,
	    nodename: me.nodename,
	});

	Ext.apply(me, {
	    url: `/api2/json/nodes/${me.nodename}/dns`,
	    cwidth1: 130,
	    interval: 10 * 1000,
	    run_editor: run_editor,
	    rows: {
		search: {
		    header: 'Search domain',
		    required: true,
		    renderer: Ext.htmlEncode,
		},
		dns1: {
		    header: gettext('DNS server') + " 1",
		    required: true,
		    renderer: Ext.htmlEncode,
		},
		dns2: {
		    header: gettext('DNS server') + " 2",
		    renderer: Ext.htmlEncode,
		},
		dns3: {
		    header: gettext('DNS server') + " 3",
		    renderer: Ext.htmlEncode,
		},
	    },
	    tbar: [
		{
		    text: gettext("Edit"),
		    handler: run_editor,
		},
	    ],
	    listeners: {
		itemdblclick: run_editor,
	    },
	});

	me.callParent();

	me.on('activate', me.rstore.startUpdate);
	me.on('deactivate', me.rstore.stopUpdate);
	me.on('destroy', me.rstore.stopUpdate);
    },
});
