<?php
/**
 * (C) MoPad
 */
namespace MoPad\AdminBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;

use Sonata\AdminBundle\Route\RouteCollection;

/** 
 * In the GameAdmin we define all input fields for the create/update form, the field validation, 
 * the filter attributes and list attributes.
 *
 * Helpful website for file upload is {@link http://blog.code4hire.com/2011/08/symfony2-sonata-admin-bundle-and-file-uploads/}
 *
 * @author Janina Trost <janina.trost@student.htw-berlin.de>
 * @package MoPad\AdminBundle\Admin
 */
class GameAdmin extends Admin
{
	/**
	 * set all parameters for the input form to create or update a game entity
	 *
	 * @param FormMapper
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
				        'joypad' => 'joypad',
				        'joystick' => 'joystick',
				    ),
				    'required' => true,
				    'multiple' => false,
				    'help' => 'Choose the GamePad.'
				))
			->add('image', 'file', array('required' => false))
			->add('gameJs', 'file', array('required' => false))
        ;
    }

	/**
	 * create and set file names for image and js
	 *
	 * @param Game
	 */
	public function prePersist($game) 
	{
		$game->setImageName($game->createImageName());
		$game->setGameJsName($game->createGameJsName());
	}
	
	/**
	 * create and set file names for image and js
	 *
	 * @param Game
	 */
	public function preUpdate($game) 
	{
	    $game->setImageName($game->createImageName());
		$game->setGameJsName($game->createGameJsName());
	}
	
	/**
	 * save local the file (image, js) from the game
	 *
	 * @param Game
	 */
	public function postPersist($game) 
	{
		$this->saveFiles($game);
	}
	
	/**
	 * save local the file (image, js) from the game
	 *
	 * @param Game
	 */
	public function postUpdate($game) 
	{
	    $this->saveFiles($game);
	}
	
	/**
	 * start the upload from the files
	 *
	 * @param Game
	 */
	public function saveFiles($game) 
	{
	    $basepath = $this->getRequest()->getBasePath();
	    $game->upload($basepath, 'image');
		$game->upload($basepath, 'gamejs');
	}
	
	/**
	 * remove the file before the game deletion
	 *
	 * @param Game
	 */
	public function preRemove($game) 
	{
		$basepath = $this->getRequest()->getBasePath();
		$game->removeImage($basepath);
		// remove gameJs
	}
	//-------------------------------

	/**
	 * set all possible filter attributes
	 *
	 * @param DatagridMapper
	 */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('name')
            ->add('activated')
        ;
    }

	/**
	 * set all attribute for the list view from all game entities
	 * @param ListMapper
	 */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id')
            ->add('name')
			->add('description')
			->add('vendor')
			->add('acceptedGamepads')
			->add('imageName')
			->add('activated')
			->add('_action', null, array('actions' => array('delete' => array(), 'edit' => array())))
		;
    }

	/**
	 * set the value validators for the input form
	 * @param ErrorElement
	 * @param object
	 */
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