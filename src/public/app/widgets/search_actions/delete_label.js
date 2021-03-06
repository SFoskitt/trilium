import SpacedUpdate from "../../services/spaced_update.js";
import AbstractAction from "./abstract_action.js";

const TPL = `
<tr>
    <td>
        Delete label:
    </td>
    <td>
        <div style="display: flex; align-items: center">
            <div style="margin-right: 15px;" class="text-nowrap">Label name:</div> 
            
            <input type="text" 
               class="form-control label-name"
               pattern="[\\p{L}\\p{N}_:]+"
               title="Alphanumeric characters, underscore and colon are allowed characters."/>
        </div>
    </td>
    <td>
        <span class="bx bx-x icon-action" data-action-conf-del></span>
    </td>
</tr>`;

export default class DeleteLabelSearchAction extends AbstractAction {
    static get actionName() { return "deleteLabel"; }

    doRender() {
        const $action = $(TPL);
        const $labelName = $action.find('.label-name');
        $labelName.val(this.actionDef.labelName || "");

        const spacedUpdate = new SpacedUpdate(async () => {
            await this.saveAction({ labelName: $labelName.val() });
        }, 1000)

        $labelName.on('input', () => spacedUpdate.scheduleUpdate());

        return $action;
    }
}
