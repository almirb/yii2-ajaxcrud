/*!
 * Ajax Crud 
 * =================================
 * Use for johnitvn/yii2-ajaxcrud extension
 * @author John Martin john.itvn@gmail.com
 */
$(document).ready(function () {

    //Added support for stacked modals
    var modals = [];

    // Create instance of Modal Remote
    if ( $("#ajaxCrudModal").length ) {
        modal = new ModalRemote('#ajaxCrudModal');
        modals['#ajaxCrudModal'] = modal;
    }

    // Catch click event on all buttons that want to open a modal
    $(document).on('click', '[role="modal-remote"]', function (event) {
        event.preventDefault();

        var selector = $(this).attr('data-modal') || '#ajaxCrudModal';
        if (modals[selector]) {
            modal = modals[selector];
        } else {
            modal = new ModalRemote(selector);
            modals[selector] = modal;
        }

        // Open modal
        modal.open(this, null);
    });

    // Catch click event on all buttons that want to open a modal
    // with bulk action
    $(document).on('click', '[role="modal-remote-bulk"]', function (event) {
        event.preventDefault();

        // Collect all selected ID's
        var selectedIds = [];
        $('input:checkbox[name="selection[]"]').each(function () {
            if (this.checked)
                selectedIds.push($(this).val());
        });

        if (selectedIds.length == 0) {
            // If no selected ID's show warning
            modal.show();
            modal.setTitle('No selection');
            modal.setContent('You must select item(s) to use this action');
            modal.addFooterButton("Close", 'btn btn-default', function (button, event) {
                this.hide();
            });
        } else {
            // Open modal
            modal.open(this, selectedIds);
        }
    });
});

$(document).on('click', '.dismiss-modal', function (event) {
    $(this).closest('.modal').modal('hide');
    event.preventDefault();
});

$(document).on('hidden.bs.modal', '.modal', function (event) {
    if (typeof tinyMCE !== 'undefined') {
        tinyMCE.editors = [];
    }
    if ($('.modal:visible').length) {
        $('body').addClass('modal-open');
    }
});
