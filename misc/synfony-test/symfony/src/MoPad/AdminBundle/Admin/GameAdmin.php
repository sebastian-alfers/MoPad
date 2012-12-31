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
			->add('image', 'file', array('required' => false))
        ;
    }

	/**
	 * http://blog.code4hire.com/2011/08/symfony2-sonata-admin-bundle-and-file-uploads/
	 */
	public function prePersist($game) 
	{
		$game->setImageName($game->createImageName());
	}
	
	public function preUpdate($game) 
	{
	    $game->setImageName($game->createImageName());
	}
	
	public function postPersist($game) 
	{
		$this->saveFile($game);
	}
	
	public function postUpdate($game) 
	{
	    $this->saveFile($game);
	}
	 
	public function saveFile($game) 
	{
	    $basepath = $this->getRequest()->getBasePath();
	    $game->upload($basepath);    
	}
	
	public function preRemove($game) 
	{
		$basepath = $this->getRequest()->getBasePath();
		$game->removeImage($basepath);
	}
	//-------------------------------

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