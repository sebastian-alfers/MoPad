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
            ->add('name')
            ->add('activated', null, array('required' => true))
            ->add('description')
            ->add('apiKey')
            ->add('vendor')
            ->add('minPlayer')
            ->add('maxPlayer')
            ->add('acceptedGamePads')

        ;
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('name')
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
                ->assertMaxLength(array('limit' => 32))
            ->end()
        ;
    }

}