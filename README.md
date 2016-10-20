yii2-ajaxcrud 
=============

[![Latest Stable Version](https://poser.pugx.org/johnitvn/yii2-ajaxcrud/v/stable)](https://packagist.org/packages/johnitvn/yii2-ajaxcrud)
[![License](https://poser.pugx.org/johnitvn/yii2-ajaxcrud/license)](https://packagist.org/packages/johnitvn/yii2-ajaxcrud)
[![Total Downloads](https://poser.pugx.org/johnitvn/yii2-ajaxcrud/downloads)](https://packagist.org/packages/johnitvn/yii2-ajaxcrud)

Gii CRUD template for Single Page Ajax Administration for yii2 

![yii2 ajaxcrud extension screenshot](https://c1.staticflickr.com/1/330/18659931433_6e3db2461d_o.png "yii2 ajaxcrud extension screenshot")


Features
------------
+ Create, read, update, delete in onpage with Ajax
+ Bulk delete suport
+ Pjax widget suport
+ Export function(pdf,html,text,csv,excel,json)

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist johnitvn/yii2-ajaxcrud "*"
```

or add

```
"johnitvn/yii2-ajaxcrud": "*"
```

to the require section of your `composer.json` file.


Usage
-----
For first you must enable Gii module Read more about [Gii code generation tool](http://www.yiiframework.com/doc-2.0/guide-tool-gii.html)

Because this extension used [kartik-v/yii2-grid](https://github.com/kartik-v/yii2-grid) extensions so we must config gridview module before

Let 's add into modules config in your main config file
````php
'modules' => [
    'gridview' =>  [
        'class' => '\kartik\grid\Module'
    ]       
]
````

You can then access Gii through the following URL:

http://localhost/path/to/index.php?r=gii

and you can see <b>Ajax CRUD Generator</b>

Other Links
[Free download wordpress theme](https://w3deep.com/wordpress-theme/)
[Free download html template](https://w3deep.com/html-template/)

-------------

Using modal window for model create/update
------------------------------------------

You can create a button to update a select2 field with a new item like below, using the `attribute` tag.
Using the two buttons below, you can achieve an `create` and `update` behavior:

````php
<?= Html::a('<i class="glyphicon glyphicon-plus"></i>', ['/person/create'],
                ['role'=>'modal-remote','title'=> 'Create new Person','class'=>'btn btn-default form-control',
                    'style' => ($model->person_id) ? 'display: none' : '',
                    'attribute' => Html::getInputId($model, 'person_id')

                ]); ?>
````

Or refresh the modified item on select2 field:

````php

 <?= Html::a('<i class="glyphicon glyphicon-pencil"></i>', ['/person/update'],
                ['role'=>'modal-remote','title'=> Yii::t('app','Edit').' '.Yii::t('app','Person'),'class'=>'btn btn-default form-control','id' => 'person-update', 'tabindex' => -1,
                    'attribute' => Html::getInputId($model, 'person_id'),
                    'style' => (!$model->person_id) ? 'display: none' : '',
                    'type' => 'update',

                ]); ?>                
````

The modal window will retrieve the `create` or `update` form. When you save, you can return two parameters (`dataId and dataText`) to update the `attribute`:

````php
        //Piece of the actionCreate of the PersonaController
        if($request->isGet){
                return [
                    'title'=> "Create new Person",
                    'content'=>$this->renderAjax('create', [
                        'model' => $model,
                    ]),
                    'footer'=> Html::button('Close',['class'=>'btn btn-default pull-left','data-dismiss'=>"modal"]).
                        Html::button('Save',['class'=>'btn btn-primary','type'=>"submit"])

                ];
            }else if($model->load($request->post()) && $model->save()){
                return [
                    'forceClose'=> true,
                    'dataId' => $model->person_id,      <------- HERE
                    'dataText' => $model->name,
                ];
            }else{
                return [
                    'title'=> "Create new Person",
                    'content'=>$this->renderAjax('create', [
                        'model' => $model,
                    ]),
                    'footer'=> Html::button('Close',['class'=>'btn btn-default pull-left','data-dismiss'=>"modal"]).
                        Html::button('Save',['class'=>'btn btn-primary','type'=>"submit"])
                ];
            }
````
