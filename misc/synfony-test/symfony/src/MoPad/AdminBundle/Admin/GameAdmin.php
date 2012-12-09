<?php
namespace MoPad\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;

use Sonata\AdminBundle\Route\RouteCollection;

class GameAdmin extends Admin
{
	/*
	protected $baseRouteName = 'game_admin';
	
	protected function configureRoutes(RouteCollection $collection)
    {
        $collection->add('duplicate');
        $collection->add('view', $this->getRouterIdParameter().'/view');
    }
	
	public function getPersistentParameters()
    {
        if (!$this->getRequest()) {
            return array();
        }

        return array(
            'provider' => $this->getRequest()->get('provider'),
            'context'  => $this->getRequest()->get('context', 'default'),
        );
		// the result :
		// $admin->generateUrl('create') => /admin/module/create?context=default
		// <a href="{{ admin.generateUrl('list') }}">List</a>
    }
	*/
	
	
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('name', null, array('help' => 'Set the name of the game.', 'label' => 'label.game_name'))
            ->add('activated', null, array('required' => false, 'help' => 'Should the game activated?'))
            ->add('description', null, array('help' => 'Set the description of the game.'))
            ->add('apiKey', null, array('help' => 'Set the apiKey of the game.'))
            ->add('vendor', null, array('help' => 'Set the name of the game vendor.'))
            ->add('minPlayer', null, array('help' => 'How many players minimal?'))
            ->add('maxPlayer', null, array('help' => 'How many players maximal?'))
            ->add('acceptedGamepads', 'choice', array(
				    'choices' => array(
				        'joystick' => 'joystick',
				        'joypad' => 'joypad',
				    ),
				    'required' => true,
				    'multiple' => false,
				    'help' => 'Choose the GamePad.'
				))
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('name')
            ->add('activated')
        ;
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('name')
            ->add('activated')
        ;
    }

    public function validate(ErrorElement $errorElement, $object)
    {
        $errorElement
            ->with('name')
				->assertMinLength(array('limit' => 4))
                ->assertMaxLength(array('limit' => 32))
            ->end()
        ;
    }

}