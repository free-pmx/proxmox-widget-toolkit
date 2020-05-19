Ext.define('Proxmox.form.RealmComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.pmxRealmComboBox',

    controller: {
	xclass: 'Ext.app.ViewController',

	init: function(view) {
	    view.store.on('load', this.onLoad, view);
	},

	onLoad: function(store, records, success) {
	    if (!success) {
		return;
	    }
	    var me = this;
	    var val = me.getValue();
	    if (!val || !me.store.findRecord('realm', val)) {
		var def = 'pam';
		Ext.each(records, function(rec) {
		    if (rec.data && rec.data.default) {
			def = rec.data.realm;
		    }
		});
		me.setValue(def);
	    }
	},
    },

    fieldLabel: gettext('Realm'),
    name: 'realm',
    queryMode: 'local',
    allowBlank: false,
    editable: false,
    forceSelection: true,
    autoSelect: false,
    triggerAction: 'all',
    valueField: 'realm',
    displayField: 'descr',
    getState: function() {
	return { value: this.getValue() };
    },
    applyState: function(state) {
	if (state && state.value) {
	    this.setValue(state.value);
	}
    },
    stateEvents: ['select'],
    stateful: true, // last chosen auth realm is saved between page reloads
    id: 'pveloginrealm', // We need stable ids when using stateful, not autogenerated
    stateID: 'pveloginrealm',

    store: {
	model: 'pmx-domains',
	autoLoad: true,
    },
});