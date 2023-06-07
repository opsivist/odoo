/* @odoo-module */

import { threadActionsRegistry } from "@mail/core/thread_actions";
import { CallSettings } from "@mail/discuss/call/call_settings";
import { useRtc } from "@mail/discuss/call/rtc_hook";
import { useComponent } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";

threadActionsRegistry
    .add("call", {
        condition(component) {
            return (
                component.thread?.allowCalls &&
                component.thread !== component.rtc.state.channel &&
                !component.props.chatWindow?.hidden
            );
        },
        icon: "fa fa-fw fa-phone",
        iconLarge: "fa fa-fw fa-lg fa-phone",
        name: _t("Start a Call"),
        open(component) {
            component.rtc.toggleCall(component.thread);
        },
        sequence: 10,
        setup() {
            const component = useComponent();
            component.rtc = useRtc();
        },
    })
    .add("settings", {
        component: CallSettings,
        condition(component) {
            return (
                component.thread?.allowCalls &&
                (!component.props.chatWindow || component.props.chatWindow.isOpen)
            );
        },
        icon: "fa fa-fw fa-gear",
        iconLarge: "fa fa-fw fa-lg fa-gear",
        name: _t("Show Call Settings"),
        nameActive: _t("Hide Call Settings"),
        sequence(component) {
            return component.props.chatWindow && component.thread === component.rtc.state.channel
                ? 6
                : 60;
        },
        setup() {
            const component = useComponent();
            component.rtc = useRtc();
        },
        toggle: true,
    });
